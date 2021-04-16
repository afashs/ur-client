import React, { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import {
  isLoginVar,
  searchState,
  typeCheck,
} from "../../common/graphql/client";
import { useReactiveVar } from "@apollo/client";
import { Search, HouseDoorFill } from "react-bootstrap-icons";
import { useHistory } from "react-router";
import {
  Navbar,
  Button,
  InputGroup,
  FormControl,
  Col,
  Container,
} from "react-bootstrap";

const Header = () => {
  const isLogin = useReactiveVar(isLoginVar);
  if (localStorage.getItem("token")) {
    isLoginVar(true);
  }

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("uploadObj");
    isLoginVar(false);
  };

  const [searchInput, setSearchInput] = useState("" as string);
  const searchInputHandler = (e: any) => {
    const { value } = e.target;
    setSearchInput(value);
  };

  const searchBtnHandler = () => {
    if (!searchInput) {
      return;
    }
    if (location.pathname === "/textlist") {
      typeCheck("textgame");
    } else if (location.pathname === "/imglist") {
      typeCheck("imggame");
    } else if (location.pathname === "/") {
      typeCheck("");
    }
    searchState(searchInput);
    setSearchInput("");
  };

  const history = useHistory();
  const onKeyPress = (e: any) => {
    if (e.key === "Enter" && searchInput !== "") {
      searchBtnHandler();
      history.push(`/searchlist/${searchInput}`);
      return;
    }
  };

  return (
    <>
      <Container fluid={true} className="sm-pd-0">
        <Col xl={2} lg={2} md={3} sm={4} xs={5} className="urBrand">
          <Navbar.Toggle className="mr-2 sm" aria-controls="basic-navbar-nav" />
          <LinkContainer to="/">
            <Button variant="dark" size="sm" className="home-btn">
              <HouseDoorFill />
            </Button>
          </LinkContainer>
        </Col>
        {/* <Col xl={4} lg={3} className="d-none d-lg-block">
          <Navbar.Collapse id="basic-navbar-nav" className="">
            <Nav className="">
              <LinkContainer to="/textlist">
                <Nav.Link>밸런스게임</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/imglist">
                <Nav.Link>이상형월드컵</Nav.Link>
              </LinkContainer>
              {isLogin ? (
                <>
                  <NavDropdown title="마이페이지" id="basic-nav-dropdown">
                    <LinkContainer to="/">
                      <Nav.Link>나의 테스트</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/mypage">
                      <Nav.Link>정보수정</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/">
                      <Nav.Link>즐겨찾기</Nav.Link>
                    </LinkContainer>
                  </NavDropdown>
                  <LinkContainer to="/multistep">
                    <Nav.Link>테스트 만들기</Nav.Link>
                  </LinkContainer>
                </>
              ) : (
                ""
              )}
            </Nav>
          </Navbar.Collapse>
        </Col> */}
        <Col xl={9} lg={9} md={8} sm={7} xs={7} className="nav mt-1 mr-auto">
          <InputGroup size="sm">
            <FormControl
              className="font-bgr"
              value={searchInput}
              size="sm"
              required
              placeholder="검색어를 입력해주세요"
              aria-describedby="basic-addon1"
              onChange={searchInputHandler}
              onKeyPress={onKeyPress}
            />
            <InputGroup.Append>
              <LinkContainer
                to={searchInput ? `/searchlist/${searchInput}` : ""}
              >
                <Button variant="dark" onClick={searchBtnHandler}>
                  <Search />
                </Button>
              </LinkContainer>
            </InputGroup.Append>
          </InputGroup>
        </Col>
        {isLogin ? (
          <LinkContainer to="/" className="d-none d-md-block ml-auto mt-1">
            <Button
              variant="info"
              className="font-mg"
              onClick={() => logoutHandler()}
              size="sm"
            >
              로그아웃
            </Button>
          </LinkContainer>
        ) : (
          <LinkContainer to="/login" className="d-none d-md-block ml-auto mt-1">
            <Button className="font-mg" variant="info" size="sm">
              로그인
            </Button>
          </LinkContainer>
        )}
      </Container>
    </>
  );
};

export default Header;

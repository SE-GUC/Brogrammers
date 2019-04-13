import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Register from "./components/pages/Register";
import RegisterLawyer from "./components/pages/RegisterLawyer";
import RegisterReviewer from "./components/pages/RegisterReviewer";
import RegisterAdmin from "./components/pages/RegisterAdmin";
import TakeMoney from "./components/pages/TakeMoney";
import "typeface-roboto";
import ReviewerCases from "./components/pages/ReviewerCases";
import LawyerCases from "./components/pages/LawyerCases";
import AdminCases from "./components/pages/AdminCases";
import InvestorCompanyRegSSC from "./components/pages/InvestorCompanyRegSSC";
import InvestorCompanyRegSPC from "./components/pages/InvestorCompanyRegSPC";
import EditProfileInvestor from "./components/pages/EditProfileInvestor";
import EditProfileAdmin from "./components/pages/EditProfileAdmin";
import EditProfileLawyer from "./components/pages/EditProfileLawyer";
import EditProfileReviewer from "./components/pages/EditProfileReviewer";
import InvestorRequests from "./components/pages/InvestorRequests";
import LawyerComment from "./components/pages/LawyerComment";
import ReviewerComment from "./components/pages/ReviewerComment";
import AdminSignIn from "./components/signin/AdminSignin";
import ReviewerSignIn from "./components/signin/ReviewerSignIn";
import LawyerSignIn from "./components/signin/LawyerSignIn";
import SignIn from "./components/signin/Signin";
import ComplexButton from "./components/layout/Complex Button/ComplexButton";
import ViewLawyerCasesbyID from "./components/pages/ViewLawyerCasesbyID.js";
import ViewReviewerCasesbyID from "./components/pages/ViewReviewerCasesbyID";
import ViewApprovedCompanies from "./components/pages/ViewApprovedCompanies";
import ChooseLawRegulation from "./components/pages/ChooseLawRegulation";
import ChooseCompanyType from "./components/pages/ChooseCompanyType";
import ViewLawyerEditableCases from "./components/pages/ViewLawyerEditableCases";
import AdminProfile from "./components/pages/AdminProfile";
import LawyerProfile from "./components/pages/LawyerProfile";
import ReviewerProfile from "./components/pages/ReviewerProfile";
import InvestorProfile from "./components/pages/InvestorProfile";
import LawyerCompanyRegSSC from "./components/pages/LawyerCompanyRegSSC";
import LawyerCompanyRegSPC from "./components/pages/LawyerCompanyRegSPC";
import ViewCompanies from "./components/pages/ViewCompanies";


class App extends Component {
  constructor(props) {
    super(props);
    this.token = null;
    this.auth = null;
    this.state = {
      display: null,
      test: [],
      lawyerCases: [],
      companys: [],
      isLoaded: false,
      token: null,
      auth: false,
      type: ""
    };
  }

  

  setToken(t, a, type, id, ssn) {
    sessionStorage.setItem("jwtToken", t);
    sessionStorage.setItem("auth", a);
    sessionStorage.setItem("type", type);
    sessionStorage.setItem("id", id);
    sessionStorage.setItem("ssn", ssn);
    console.log(sessionStorage.getItem("ssn"));
  }
  handleSignOut = () => {
    sessionStorage.getItem("auth")
      ? this.setState({ display: "none" })
      : console.log();
  };
  handletoken = () => {
    this.setState({ token: sessionStorage.getItem("auth") });
  };
  render() {
    console.log(sessionStorage.getItem("auth"));
    // in the Navbar for the logout try to pass the auth and then render
    return (
      <Router>
        <React.Fragment>
          <Navbar />

          <Route
              exact
              path="/signin"
              render={props => (
                <div>
                       <ComplexButton />{' '}
                </div>
              )}
            />
     

          <div style={this.state.display}>
            <Route
              exact
              path="/"
              render={props => (
                <div>
                   <ViewApprovedCompanies />{' '}
                </div>
              )}
            />{" "}
          </div>
          <Route exact path="/pay" render={props => <TakeMoney />} />{" "}
          <Route
            exact
            path="/register"
            render={props => <Register callBack={this.setToken} />}
          />
          <Route
            exact
            path="/admin/register-lawyer"
            component={() =>
              sessionStorage.getItem("auth") &&
              sessionStorage.getItem("type") == "a" ? (
                <RegisterLawyer
                  callBack={this.setToken}
                  token={sessionStorage.getItem("jwtToken")}
                />
              ) : (
                <LawyerSignIn />
              )
            }
          />
          <Route
            exact
            path="/admin/register-reviewer"
            component={() =>
              sessionStorage.getItem("auth") &&
              sessionStorage.getItem("type") == "a" ? (
                <RegisterReviewer
                  callBack={this.setToken}
                  token={sessionStorage.getItem("jwtToken")}
                />
              ) : (
                <ReviewerSignIn />
              )
            }
          />
          <Route
            exact
            path="/admin/register-admin"
            render={props => <RegisterAdmin callBack={this.setToken} />}
          />
          <Route
            exact
            path="/admin/register-lawyer"
            component={() =>
              sessionStorage.getItem("auth") &&
              sessionStorage.getItem("type") == "a" ? (
                <RegisterLawyer
                  callBack={this.setToken}
                  token={sessionStorage.getItem("jwtToken")}
                />
              ) : (
                <AdminSignIn callBack={this.setToken} />
              )
            }
          />{" "}
          <Route exact path="/chooseType/:law" component={ChooseCompanyType} />{" "}
          <Route exact path="/chooseLaw" component={ChooseLawRegulation} />{" "}
          <Route
            exact
            path="/admin/register-reviewer"
            component={() =>
              sessionStorage.getItem("auth") &&
              sessionStorage.getItem("type") == "a" ? (
                <RegisterReviewer
                  callBack={this.setToken}
                  token={sessionStorage.getItem("jwtToken")}
                />
              ) : (
                <AdminSignIn callBack={this.setToken} />
              )
            }
          />{" "}
          <Route
            exact
            path="/admin/register-admin"
            component={() =>
              sessionStorage.getItem("auth") &&
              sessionStorage.getItem("type") == "a" ? (
                <RegisterAdmin
                  callBack={this.setToken}
                  token={sessionStorage.getItem("jwtToken")}
                />
              ) : (
                <AdminSignIn callBack={this.setToken} />
              )
            }
          />{" "}
          {/* <Route exact path="/admin/register-admin" render={props => (<RegisterAdmin callBack={this.setToken}/>)} /> */}{" "}
          <Route
            exact
            path="/editprofile/investor"
            render={props => (
              <EditProfileInvestor
                token={this.state.token}
                token={sessionStorage.getItem("jwtToken")}
              />
            )}
            component={() =>
              sessionStorage.getItem("auth") &&
              sessionStorage.getItem("type") == "i" ? (
                <EditProfileInvestor
                  token={sessionStorage.getItem("jwtToken")}
                />
              ) : (
                <SignIn />
              )
            }
          />{" "}
          <Route
            exact
            path="/editprofile/admin"
            component={() =>
              sessionStorage.getItem("auth") &&
              sessionStorage.getItem("type") == "a" ? (
                <EditProfileAdmin token={sessionStorage.getItem("jwtToken")} />
              ) : (
                <AdminSignIn />
              )
            }
          />{" "}
          <Route
            exact
            path="/editprofile/lawyer"
            component={() =>
              sessionStorage.getItem("auth") &&
              sessionStorage.getItem("type") == "l" ? (
                <EditProfileLawyer token={sessionStorage.getItem("jwtToken")} />
              ) : (
                <LawyerSignIn />
              )
            }
          />{" "}
          <Route
            exact
            path="/addcomment/lawyer"
            component={() =>
              sessionStorage.getItem("auth") &&
              sessionStorage.getItem("type") == "l" ? (
                <LawyerComment token={sessionStorage.getItem("jwtToken")} />
              ) : (
                <LawyerSignIn />
              )
            }
          />{" "}
          <Route
            exact
            path="/addcomment/reviewer"
            component={() =>
              sessionStorage.getItem("auth") &&
              sessionStorage.getItem("type") == "r" ? (
                <ReviewerComment token={sessionStorage.getItem("jwtToken")} />
              ) : (
                <ReviewerSignIn />
              )
            }
          />{" "}
          <Route
            exact
            path="/editprofile/reviewer"
            component={() =>
              sessionStorage.getItem("auth") &&
              sessionStorage.getItem("type") == "r" ? (
                <EditProfileReviewer
                  token={sessionStorage.getItem("jwtToken")}
                />
              ) : (
                <ReviewerSignIn />
              )
            }
          />{" "}
          <Route
            exact
            path="/InvestorSSCForm"
            render={props => (
              <InvestorCompanyRegSSC
                token={sessionStorage.getItem("jwtToken")}
              />
            )}
          />{" "}
          <Route
            exact
            path="/InvestorSPCForm"
            render={props => (
              <InvestorCompanyRegSPC
                token={sessionStorage.getItem("jwtToken")}
              />
            )}
          />{" "}
          <Route
            exact
            path="/LawyerSSCForm"
            render={props => (
              <LawyerCompanyRegSSC token={sessionStorage.getItem("jwtToken")} />
            )}
          />{" "}
          <Route
            exact
            path="/LawyerSPCForm"
            render={props => (
              <LawyerCompanyRegSPC token={sessionStorage.getItem("jwtToken")} />
            )}
          />{" "}
          <Route
            exact
            path="/lawyer/view-lawyer-cases-by-id"
            component={() =>
              sessionStorage.getItem("auth") &&
              sessionStorage.getItem("type") == "l" ? (
                <ViewLawyerCasesbyID
                  id={sessionStorage.getItem("id")}
                  token={sessionStorage.getItem("jwtToken")}
                />
              ) : (
                <LawyerSignIn />
              )
            }
          />{" "}
          <Route
            exact
            path="/reviewer/view-reviewer-cases-by-id"
            component={() =>
              sessionStorage.getItem("auth") &&
              sessionStorage.getItem("type") == "r" ? (
                <ViewReviewerCasesbyID
                  id={sessionStorage.getItem("id")}
                  token={sessionStorage.getItem("jwtToken")}
                />
              ) : (
                <ReviewerSignIn />
              )
            }
          />{" "}
          <Route
            exact
            path="/investors/MyRequests/all"
            component={() =>
              sessionStorage.getItem("auth") &&
              sessionStorage.getItem("type") == "i" ? (
                <InvestorRequests
                  id={sessionStorage.getItem("id")}
                  token={sessionStorage.getItem("jwtToken")}
                />
              ) : (
                <SignIn />
              )
            }
          />
          <div>
            <Route
              exact
              path="/Investorlogin"
              render={props => <SignIn callBack={this.setToken} />}
            />{" "}
            <Route
              exact
              path="/Lawyerlogin"
              render={props => <LawyerSignIn callBack={this.setToken} />}
            />
            <Route
              exact
              path="/Reviewerlogin"
              render={props => <ReviewerSignIn callBack={this.setToken} />}
            />
            <Route
              exact
              path="/Adminlogin"
              render={props => <AdminSignIn callBack={this.setToken} />}
            />
            <Route
              exact
              path="/LawyerEditableCases"
              component={() =>
                sessionStorage.getItem("auth") &&
                sessionStorage.getItem("type") == "l" ? (
                  <ViewLawyerEditableCases
                    id={sessionStorage.getItem("id")}
                    ssn={sessionStorage.getItem("ssn")}
                    token={sessionStorage.getItem("jwtToken")}
                  />
                ) : (
                  <LawyerSignIn callBack={this.setToken} />
                )
              }
            />
            <Route
              exact
              path="/LawyerCases"
              render={() =>
                sessionStorage.getItem("type") == "l" ? (
                  <LawyerCases token={sessionStorage.getItem("jwtToken")} />
                ) : (
                  <SignIn />
                )
              }
            />
            {/* Waiting for Login token  */}{" "}
            <Route
              exact
              path="/ReviewerCases"
              render={() =>
                sessionStorage.getItem("type") == "r" ? (
                  <ReviewerCases token={sessionStorage.getItem("jwtToken")} />
                ) : (
                  <SignIn />
                )
              }
            />
            <Route
              exact
              path="/AdminCases"
              render={() =>
                sessionStorage.getItem("type") == "a" ? (
                  <AdminCases token={sessionStorage.getItem("jwtToken")} />
                ) : (
                  <SignIn />
                )
              }
            />
            <Route
              exact
              path="/ViewCompanies"
              component={() => 
                sessionStorage.getItem("auth") &&
                sessionStorage.getItem("type") === "i" ? (
                  <ViewCompanies token={sessionStorage.getItem("jwtToken")} />
                ) : (
                  <SignIn />
                )
              }
            />
            <Route
              exact
              path="/profile"
              component={() => {
                if (
                  sessionStorage.getItem("auth") &&
                  sessionStorage.getItem("type") == "a"
                ) {
                  return <AdminProfile />;
                } else {
                  if (
                    sessionStorage.getItem("auth") &&
                    sessionStorage.getItem("type") == "i"
                  ) {
                    return <InvestorProfile />;
                  } else {
                    if (
                      sessionStorage.getItem("auth") &&
                      sessionStorage.getItem("type") == "r"
                    ) {
                      return <ReviewerProfile />;
                    } else {
                      if (
                        sessionStorage.getItem("auth") &&
                        sessionStorage.getItem("type") == "l"
                      ) {
                        return <LawyerProfile />;
                      } else {
                        return <SignIn />;
                      }
                    }
                  }
                }
              }}
            />{" "}
          </div>{" "}
        </React.Fragment>{" "}
      </Router>
    );
  }
}
export default App;

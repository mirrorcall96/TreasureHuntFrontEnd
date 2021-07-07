import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  EuiHeader,
  EuiHeaderSectionItem,
  EuiHeaderLogo,
  EuiHeaderLinks,
  EuiHeaderLink,
  EuiButton,
  EuiBetaBadge,
  EuiForm,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiFieldNumber,
  EuiPopover,
} from "@elastic/eui";
import { useState } from "react";
import { addBalance } from "../store/action/authActions";
const NavList = () => {
  let user = useSelector((state) => {
    return state.user.user;
  });

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const dispatch = useDispatch();
  const onButtonClick = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };
  const closePopover = () => {
    setIsPopoverOpen(false);
  };
  const submit = () => {
    dispatch(addBalance(balance));
    setBalance(0);
    closePopover();
  };
  const button = (
    <EuiBetaBadge
      onClick={onButtonClick}
      label={"$" + (user ? user.balance : 0)}
    />
  );
  const formSample = (
    <EuiForm component="form">
      <EuiFlexGroup>
        <EuiFlexItem grow={false} style={{ width: 100 }}>
          <EuiFormRow label="Amount">
            <EuiFieldNumber
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              max={100}
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem></EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiFormRow hasEmptyLabelSpace>
            <EuiButton onClick={() => submit()} size="s">
              Load
            </EuiButton>
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiForm>
  );

  return (
    <EuiHeader>
      <EuiHeaderSectionItem border="none">
        <EuiHeaderLogo>Treasure Hunt</EuiHeaderLogo>
        <EuiHeaderLinks>
          <Link to="/">
            <EuiHeaderLink iconType="package" />
          </Link>
          <Link to={user ? "history" : "signin"}>
            <EuiHeaderLink>History</EuiHeaderLink>
          </Link>
        </EuiHeaderLinks>
      </EuiHeaderSectionItem>
      <EuiHeaderSectionItem border="none" side="right"></EuiHeaderSectionItem>
      <EuiHeaderSectionItem>
        <EuiHeaderLinks aria-label="App navigation links example">
          {user ? (
            <>
              <EuiPopover
                id="inlineFormPopover"
                button={button}
                isOpen={isPopoverOpen}
                closePopover={closePopover}
              >
                <div style={{ width: 250 }}>{formSample}</div>
              </EuiPopover>
              <EuiHeaderLink iconType="user">
                {user.username.split("@")[0]}
              </EuiHeaderLink>
              <Link to="signout">
                <EuiHeaderLink iconType="exit"></EuiHeaderLink>
              </Link>
            </>
          ) : (
            <>
              {" "}
              <Link to="signin">
                <EuiHeaderLink>Signin</EuiHeaderLink>
              </Link>
              <Link to="signup">
                <EuiHeaderLink>Signup</EuiHeaderLink>
              </Link>
            </>
          )}
        </EuiHeaderLinks>
      </EuiHeaderSectionItem>
    </EuiHeader>
  );
};
export default NavList;

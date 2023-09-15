import * as React from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import { Avatar } from "@mui/material";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

export default function UserCard(props: any) {
  const [open, setOpen] = React.useState(false);
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const router = useRouter();
  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction="row" spacing={0}>
      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={() => {
            if (cookie.user != undefined) {
              handleToggle();
            } else {
              router.push("/login");
            }
          }}
        >
          <Avatar
            alt="User Picture"
            src={props.pfp}
            sx={{
              border: "1px solid #ADADAD",
              width: "32px",
              height: "32px",
            }}
          />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    {cookie.user != undefined ? (
                      <MenuItem
                        onClick={() => {
                          router.push("/user");
                        }}
                      >
                        Editar Perfil
                      </MenuItem>
                    ) : (
                      <></>
                    )}

                    {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                    <MenuItem
                      onClick={async () => {
                        removeCookie("user");
                        await router.push("/login");
                      }}
                    >
                      {cookie.user == undefined ? "Login" : "Logout"}
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
}

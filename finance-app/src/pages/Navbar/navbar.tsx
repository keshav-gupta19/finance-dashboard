import { useState } from "react";
import FlexBetween from "../../components/FlexBetween";
import { useTheme, Box, Typography } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState("dashboard");
  const Navigate = useNavigate();
  const handleClickHandler = () => {
    Navigate("/");
    setSelected("dashboard");
  };
  return (
    <FlexBetween mb="0.25rem" p={"0.5rem 0rem"} color={palette.grey[300]}>
      <FlexBetween gap={"0.75rem"}>
        <MonetizationOnIcon sx={{ fontSize: "28px" }} />
        <Typography
          variant="h4"
          fontSize={"16px"}
          style={{
            cursor: "pointer",
          }}
          onClick={handleClickHandler}
        >
          Financer
        </Typography>
      </FlexBetween>

      <FlexBetween>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to={"/"}
            onClick={() => {
              setSelected("dashboard");
            }}
            style={{
              color: selected == "dashboard" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            Dashboard
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to={"/predictions"}
            onClick={() => {
              setSelected("predictions");
            }}
            style={{
              color: selected == "predictions" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
              padding: "10px",
            }}
          >
            Predictions
          </Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;

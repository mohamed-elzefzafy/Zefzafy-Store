import { Stack } from "@mui/material"
import { Link } from "react-router-dom"


const HomePage = () => {
  return (
  <>
      <div>HomePage</div>
    <Stack>
    <Link to="/products">product page</Link>
    <Link to="/categories">Category page</Link>
    <Link to="/register">Register page</Link>
    <Link to="/login">Login page</Link>
    <Link to="/user/cart">cart page</Link>
    <Link to='/user/orders'>orders page</Link>
    <Link to='/admin'>admin page</Link>
    </Stack>
  </>
  )
}

export default HomePage
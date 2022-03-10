import { Box, Container } from "@mui/material"
import Head from "next/head"
import { NavBar } from "../ui"

interface Props {
  title?: string
}

export const Layout = ({title = 'Miami RE', children}) => {
  return (
    <Box sx={{ flexFlow: 1}}>
      <Head>
        <title>{ title }</title>
      </Head>
      <NavBar />
      {/* Sidebar */}
      <Box>
        <Container>
          {children}
        </Container>
      </Box>
    </Box>
  )
}
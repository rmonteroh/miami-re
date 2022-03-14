import { Box, Container } from "@mui/material"
import Head from "next/head"
import { NavBar } from "../ui"

interface Props {
  title?: string,
  children: JSX.Element,
}

export const Layout = ({title = 'Miami RE', children}: Props) => {
  return (
    <Box sx={{ flexFlow: 1}}>
      <Head>
        <title>{ title }</title>
      </Head>
      <NavBar />
      {/* Sidebar */}
      <Box>
        <Container maxWidth="xl">
          {children}
        </Container>
      </Box>
    </Box>
  )
}
import type { NextPage } from "next";
import { Layout } from "../components/layouts";
import FilterProvider from "../context/filter/FilterProvider";
import HomePage from '../components/views/HomePage';

const Home: NextPage = () => {

  return (
    <Layout>
      <FilterProvider>
        <HomePage />
      </FilterProvider>
    </Layout>
  );
};

export default Home;

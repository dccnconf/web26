import Layout from "../components/layout";
import React from "react";
import getTopics from "../libs/topics";
import CFP from "../components/CFP";

const AuthorsPage = ({topics}) => {
  return (
    <Layout pageTitle={"Authors | DCCN'2026"} active="authors">
      <section className="container mx-auto md:w-3/4 px-4 md:px-0 mb-12" id="top">
        <h2 className="text-center font-extrabold text-3xl md:text-5xl lg:mt-12">Call for Papers</h2>
        <CFP
          topics={topics}
          className="pt-6 md:container mx-6 md:mx-auto text-gray-600 lg:w-1/2"
        />
      </section>
    </Layout>
  );
};

export const getStaticProps = () => {
  return {
    props: {topics: getTopics()}
  }
};

export default AuthorsPage;

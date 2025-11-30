import Layout from "../components/layout";
import React from "react";
import EmptyPagePlaceholder from "../components/EmptyPagePlaceholder";

const SupportPage = () => (
  <Layout pageTitle="Support | DCCN'2022" active="support">
      <section className="container mx-auto md:w-3/4 px-4 md:px-0" id="contact">
          <EmptyPagePlaceholder
            imageName="undraw_envelope_n8lc.svg"
            imageAlt="Envelope image"
            scale="2/5"
          >
              <h2 className="h2">Contact Us</h2>
              <p className="text-gray-800 text-xl text-center md:text-left px-4 md:px-0">
                  If you have any questions, please write us:
                  <br />
                  <a href="mailto:org@dccn.ru" className="text-blue-600 hover:underline">org@dccn.ru</a>.
              </p>
          </EmptyPagePlaceholder>
      </section>
  </Layout>
);

export default SupportPage;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { urlFor, client } from "../../client";

import "./About.scss";
import { AppWrap, MotionWrap } from "../../Wrapper";

const About = () => {
  const [about, setAbout] = useState([]);

  useEffect(() => {
    // fetching about section from sanity
    const query = '*[_type == "about"]';

    client
      .fetch(query)
      .then((data) => {
        setAbout(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <h2 className="head-text">
        I Know that
        <span> Good Apps</span>
        <br />
        means
        <span> Good Business</span>
      </h2>

      <div className="app__profiles">
        {about.map((data, index) => {
          return (
            <motion.div
              key={data.title + index}
              whileInView={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5, type: "tween" }}
              className="app__profiles-item"
            >
              <img src={urlFor(data.imgUrl)} alt={data.title} />

              <h2 className="bold-text" style={{ marginTop: 20 }}>
                {data.title}
              </h2>
              <p className="p-text" style={{ marginTop: 10 }}>
                {data.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AppWrap(
  MotionWrap(About, "app__about"),
  "about",
  "app__whitebg"
);

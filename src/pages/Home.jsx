/** @jsxImportSource @emotion/react */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import { octokitApi } from "../api/client";
import useInfinityScroll from "../hooks/useInfinityScroll";
import { issuesContext, dispatchContext } from "../store/IssuesContext";

import List from "../component/List";
import Header from "../component/Header";
import Advertisement from "../component/Advertisement";
import Spinner from "../component/Loading";
import { centerInside } from "../shared/globalStyle";
import PageUpButton from "../component/common/PageUpButton";

const Home = () => {
  const navigate = useNavigate();

  const { issueList } = useContext(issuesContext);
  const dispatch = useContext(dispatchContext);

  const [page, setPage] = useState(0);
  const [isInit, setIsInit] = useState(true);

  const [isEnd, setIsEnd] = useState(false);
  const [observingPoint, beginObserving] = useInfinityScroll();

  useEffect(() => {
    const getData = (page) => {
      octokitApi(page)
        .then((res) => {
          if (isInit) {
            window.scrollTo(0, 0);
            dispatch({ type: "INIT_ISSUELIST", initIssue: res.data });
            setIsInit(false);
          } else {
            dispatch({ type: "ADD_ISSUELIST", initIssue: res.data });
            res.data.length === 0 && setIsEnd(true);
          }
        })
        .catch((error) => {
          navigate("/error", {
            state: `${error}`,
          });
        });
    };

    getData(page);
  }, [page]);

  useEffect(() => {
    if (isInit) {
      beginObserving(() => setPage((page) => page + 1));
    }
  }, [isInit]);

  return (
    <section>
      {issueList?.length > 0 && (
        <>
          <Header repository_url={issueList[0].repository_url} />
          {issueList.map((list, idx) => (
            <div key={list.number} css={issuesContainer}>
              {idx === 4 && <Advertisement />}
              <Link to={`/detail/${list.number}`} key={list.number} css={linkCss}>
                <List list={list} />
              </Link>
            </div>
          ))}
        </>
      )}

      {!isEnd && (
        <div ref={observingPoint}>
          <Spinner />
        </div>
      )}
      <PageUpButton />
    </section>
  );
};

const issuesContainer = css`
  width: fit-content;
  margin: 0 auto;
`;

const linkCss = css`
  text-decoration: none;
`;

export default Home;

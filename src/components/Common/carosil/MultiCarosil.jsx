import { Box, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ImageCommon from "../../imagecomponent/ImageCommon";
import { gold } from "../../../helpers/images";
import TTTypography from "../ToolTipComponents/TTTypography";
import MyFeeds from "../../../pages/reward-program/feed/components/MyFeeds";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../../store/rewardProgram/reawardProgramActions";
import { rewardProgramSelector } from "../../../store/rewardProgram/rewardProgramSlice";
export default function MultiCarosil({ pinnedPost, setPinnedPost = () => {} }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 767, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  const sliderImageUrl = [
    //First image url
    {
      url: "https://i2.wp.com/www.geeksaresexy.net/wp-content/uploads/2020/04/movie1.jpg?resize=600%2C892&ssl=1",
    },
    {
      url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-kids-movies-2020-call-of-the-wild-1579042974.jpg?crop=0.9760858955588091xw:1xh;center,top&resize=480:*",
    },
    //Second image url
    {
      url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-movies-for-kids-2020-sonic-the-hedgehog-1571173983.jpg?crop=0.9871668311944719xw:1xh;center,top&resize=480:*",
    },
    //Third image url
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQS82ET2bq9oTNwPOL8gqyoLoLfeqJJJWJmKQ&usqp=CAU",
    },

    //Fourth image url

    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTdvuww0JDC7nFRxiFL6yFiAxRJgM-1tvJTxA&usqp=CAU",
    },
  ];
  const { getPostsData, getPostsLoading } = useSelector(rewardProgramSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, []);
  useEffect(() => {
    let dd = getPostsData?.filter((it, i) => {
      return it?.is_pin == 1;
    });
    setPinnedPost(dd);
  }, [getPostsData]);
  return (
    <Grid height={"500px"}>
      {pinnedPost?.[0] && (
        <Carousel
          responsive={responsive}
          autoPlay={true}
          swipeable={true}
          draggable={true}
          showDots={true}
          infinite={true}
          arrows={false}
          partialVisible={false}
          dotListClass="custom-dot-list-style"
        >
          {pinnedPost?.map((post, index) => {
            return (
              <Box>
                <MyFeeds
                  badge={""}
                  likeComment={false}
                  created_by={post?.created_by}
                  data={post}
                  employee={post?.employee}
                  loading={getPostsLoading}
                />
              </Box>
            );
          })}
        </Carousel>
      )}
    </Grid>
  );
}

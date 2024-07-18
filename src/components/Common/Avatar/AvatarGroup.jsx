import React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { Each, imageurl, randomColor } from "../../../helpers/utils";
import { getInitials } from "../helper";
import { get } from "lodash";

export default function ProfileAvatarGroup({
  data = [],
  max = 4,
  imageKey = "profile_img",
  nameKey = "name",
}) {
  return (
    <AvatarGroup max={max}>
     {
      data?.map((item, idx) => (
          <Avatar key={idx} sx={{ bgcolor: randomColor(get(item, nameKey)) }} src={imageurl(get(item, imageKey))}>
            {getInitials(get(item, nameKey), 2)}
          </Avatar>
        ))
      }
    </AvatarGroup>
  );
}

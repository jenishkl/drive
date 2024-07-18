import { useTheme } from "@emotion/react";
import React from "react";
import {
  _audit,
  _billing,
  _cases,
  _contracts,
  _crm,
  _dashboard,
  _database,
  _drive,
  _loyalty,
  _messages,
  _notes,
  _reports,
  _rewards,
  _survey,
  _tasks,
  _timesheet,
  _resources,
  _partners
} from "./moduleLinks";
import { MdOutlineDashboard, MdOutlineHowToVote } from "react-icons/md";
import { GoStack, GoTasklist } from "react-icons/go";
import { BsCashCoin } from "react-icons/bs";
import { IoFolderOpenOutline, IoWalletOutline } from "react-icons/io5";
import { TbCirclesRelation, TbDatabasePlus, TbUserStar } from "react-icons/tb";
import { LuFileSignature, LuStickyNote } from "react-icons/lu";
import { PiChatCenteredDots, PiSealCheck } from "react-icons/pi";
import { LiaPollSolid } from "react-icons/lia";
import { FaRegFolderClosed } from "react-icons/fa6";
import { RiListSettingsLine } from "react-icons/ri";
import { PiHandshake } from "react-icons/pi";

export default function sideBarIcon(icon) {
  const icons = {
    [_billing]: <BsCashCoin size={20} />,
    [_dashboard]: <MdOutlineDashboard size={20} />,
    [_cases]: <GoStack size={20} strokeWidth={0.3} />,
    [_drive]: <FaRegFolderClosed size={20} strokeWidth={0.2} />,
    [_crm]: <TbCirclesRelation size={20} />,
    [_contracts]: <LuFileSignature size={20} />,
    [_notes]: <LuStickyNote size={18} />,
    [_tasks]: <GoTasklist size={22} strokeWidth={0.5} />,
    [_audit]: <PiSealCheck size={20} strokeWidth={5} />,
    [_messages]: <PiChatCenteredDots size={20} strokeWidth={5} />,
    [_survey]: <MdOutlineHowToVote size={20} />,
    [_loyalty]: <TbUserStar size={20} />,
    [_database]: <TbDatabasePlus size={20} />,
    [_reports]: <LiaPollSolid size={20} />,
    [_rewards]: <IoWalletOutline size={19} strokeWidth={5} />,
    [_timesheet]: <TbCirclesRelation size={20} />,
    [_resources]: <RiListSettingsLine size={20} />,
    [_partners]: <PiHandshake size={20} />
  };

  return icons[icon];
}

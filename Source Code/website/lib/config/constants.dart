import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import '/ui/pages/export.dart';

const List<Map<String, dynamic>> PAGES = [
  {
    "name": "Home",
    "page": HomePage(),
    "icon": Icons.home,
  },
  {
    "name": "About",
    "page": AboutPage(),
    "icon": Icons.person,
  },
  // {
  //   "name": "Projects",
  //   "page": ProjectsPage(),
  //   "icon": Icons.construction,
  // },
  // {
  //   "name": "Work",
  //   "page": WorkPage(),
  //   "icon": Icons.work,
  // },
  // {
  //   "name": "Awards",
  //   "page": AwardsPage(),
  //   "icon": Icons.emoji_events,
  // },
];

const List<Map<String, dynamic>> SOCIALS = [
  {
    "icon": FontAwesomeIcons.linkedin,
    "link": "https://www.linkedin.com/in/avisheklodh/",
  },
  {
    "icon": FontAwesomeIcons.github,
    "link": "https://github.com/avisheklodh2004",
  },
  {
    "icon": FontAwesomeIcons.instagram,
    "link": "https://instagram.com/avisheklodh_",
  },
  // {
  //   "icon": FontAwesomeIcons.youtube,
  //   "link": "https://youtube.com/@yugthapar37",
  // },
  // {
  //   "icon": FontAwesomeIcons.squareXTwitter,
  //   "link": "https://twitter.com/yugt37",
  // },
];

const List<Map<String, dynamic>> DETAILS = [
  {
    "detail": "+1 XXXXX-XXXXX",
    "scheme": "tel",
    "icon": Icons.call,
  },
  {
    "detail": "avisheklodh2004@gmail.com",
    "scheme": "mailto",
    "icon": Icons.mail,
  },
  {
    "detail": "Tempe, Arizona",
    "icon": Icons.location_on,
  },
];

import 'package:flutter/material.dart' hide PageController;
import 'package:get/get.dart';
import 'package:scrollable_positioned_list/scrollable_positioned_list.dart';

import '/config/constants.dart';
import '/ui/widgets/footer.dart';
import '/ui/widgets/header.dart';

class BasePage extends StatefulWidget {
  const BasePage({super.key});

  @override
  State<BasePage> createState() => _BasePageState();
}

class _BasePageState extends State<BasePage> {
  final ItemScrollController _scrollController =
      Get.put(ItemScrollController());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const Header(),
      body: SafeArea(
        child: ScrollablePositionedList.builder(
          itemCount: PAGES.length + 1,
          itemBuilder: (_, page) =>
              page < PAGES.length ? PAGES[page]["page"] : const Footer(),
          itemScrollController: _scrollController,
        ),
      ),
    );
  }
}

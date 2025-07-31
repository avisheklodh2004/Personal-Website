import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:scrollable_positioned_list/scrollable_positioned_list.dart';

import '/config/constants.dart';
import '/services/responsive.dart';

class Header extends StatelessWidget implements PreferredSizeWidget {
  const Header({super.key});

  @override
  Size get preferredSize => const Size.fromHeight(50);

  @override
  Widget build(BuildContext context) {
    return AppBar(
      leading: Responsive.isMobile(context) ? const _MobileHeader() : null,
      title: Responsive.isDesktop(context) ? const _DesktopHeader() : image(),
    );
  }
}

class _MobileHeader extends StatelessWidget {
  const _MobileHeader();

  @override
  Widget build(BuildContext context) {
    final ItemScrollController _scrollController =
        Get.find<ItemScrollController>();

    return PopupMenuButton(
      icon: const Icon(Icons.menu),
      onSelected: (index) {
        _scrollController.scrollTo(
          index: index,
          duration: const Duration(milliseconds: 500),
        );
      },
      itemBuilder: (_) => List.generate(
        PAGES.length,
        (index) {
          final String _title = PAGES[index]["name"];
          final IconData _icon = PAGES[index]["icon"];

          return PopupMenuItem(
            value: index,
            child: Row(
              children: [
                Icon(_icon),
                Padding(
                  padding: const EdgeInsets.only(left: 15, bottom: 3),
                  child: Text(
                    _title,
                    style: context.textTheme.displaySmall,
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}

class _DesktopHeader extends StatelessWidget {
  const _DesktopHeader();

  @override
  Widget build(BuildContext context) {
    final ItemScrollController _scrollController =
        Get.find<ItemScrollController>();

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 10),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          Flexible(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                image(),
                const SizedBox(width: 10),
                Hero(
                  tag: "name",
                  child: Text(
                    "Avishek Lodh",
                    style: context.textTheme.displaySmall,
                  ),
                ),
              ],
            ),
          ),
          Flexible(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: List.generate(PAGES.length, (index) {
                final String _title = PAGES[index]["name"];
                final Rx<bool> _hover = false.obs;

                return MouseRegion(
                  onEnter: (_) {
                    _hover.value = true;
                  },
                  onExit: (_) {
                    _hover.value = false;
                  },
                  child: GestureDetector(
                    onTap: () {
                      _scrollController.scrollTo(
                        index: index,
                        duration: const Duration(milliseconds: 500),
                      );
                    },
                    child: Obx(
                      () => Text(
                        _title,
                        textAlign: TextAlign.center,
                        style: context.textTheme.titleMedium!
                            .copyWith(fontSize: _hover.value ? 19 : 18),
                      ),
                    ),
                  ),
                );
              }),
            ),
          ),
        ],
      ),
    );
  }
}

Image image() => Image.asset(
      "assets/images/Logo.png",
      height: 30,
      width: 30,
      errorBuilder: (context, _, __) => Container(
        height: 30,
        width: 30,
        decoration: const BoxDecoration(
          color: Colors.grey,
          borderRadius: BorderRadius.all(Radius.circular(10)),
        ),
        child: const Icon(Icons.question_mark),
      ),
    );

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:url_launcher/url_launcher.dart' as url_launcher;

import '/config/constants.dart';

class SocialButtons extends StatelessWidget {
  const SocialButtons({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: List.generate(
        SOCIALS.length,
        (index) {
          final Rx<bool> _hover = false.obs;
          final Map<String, dynamic> _social = SOCIALS[index];

          return MouseRegion(
            onEnter: (_) => _hover.value = true,
            onExit: (_) => _hover.value = false,
            child: Obx(
              () => MaterialButton(
                height: 35,
                elevation: 10,
                focusElevation: 10,
                hoverElevation: 10,
                highlightElevation: 10,
                disabledElevation: 10,
                // width: 35,
                // alignment: Alignment.center,
                // decoration: BoxDecoration(
                //   shape: BoxShape.circle,
                // ),
                padding: EdgeInsets.only(
                  right: _social["link"].contains("youtube") ? 2 : 0,
                ),
                child:
                    // IconButton(
                    //   icon:
                    Icon(
                  _social["icon"],
                  size: _hover.value ? 21 : 18,
                  // color: context.theme.colorScheme.onSecondary,
                  color: index % 2 != 0
                      ? context.theme.colorScheme.tertiary
                      : context.theme.colorScheme.secondary,
                ),
                // padding: EdgeInsets.zero,
                onPressed: () async {
                  final Uri _url = Uri.parse(_social["link"]);

                  if (await url_launcher.canLaunchUrl(_url)) {
                    await url_launcher.launchUrl(_url);
                  }
                },
                // ),
              ),
            ),
          );
        },
      ),
    );
  }
}

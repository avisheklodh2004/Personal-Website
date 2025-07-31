import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:url_launcher/url_launcher.dart' as url_launcher;

import '/config/constants.dart';
import '/services/responsive.dart';
import './social_buttons.dart';

class Footer extends StatelessWidget {
  const Footer({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: Responsive.isDesktop(context) ? 165 : 330,
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            context.theme.colorScheme.secondary,
            context.theme.colorScheme.tertiary,
          ],
        ),
      ),
      padding: const EdgeInsets.all(10),
      child: Column(
        children: [
          Responsive(
            desktop: Column(
              children: [
                const Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Flexible(fit: FlexFit.tight, child: _Greetings()),
                    Flexible(
                      child: SizedBox(
                        height: 100,
                        child: VerticalDivider(),
                      ),
                    ),
                    Flexible(child: _Details()),
                  ],
                ),
                madeBy(context),
              ],
            ),
            mobile: Expanded(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Center(child: _Greetings()),
                  const Divider(),
                  const _Details(),
                  madeBy(context),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

Column madeBy(BuildContext context) {
  return Column(
    children: [
      const Divider(),
      const SizedBox(height: 5),
      AutoSizeText(
        "Made By :  Avishek Lodh",
        maxLines: 1,
        style: context.textTheme.titleSmall!.copyWith(
          color: context.theme.colorScheme.onSecondary,
          fontWeight: FontWeight.bold,
        ),
      ),
    ],
  );
}

class _Greetings extends StatelessWidget {
  const _Greetings();

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Center(
          child: AutoSizeText(
            "Thanks for visting my site, \nIt was great that you were here!",
            maxLines: 2,
            textAlign: Responsive.isMobile(context) ? TextAlign.center : null,
            style: context.textTheme.titleLarge!.copyWith(
              fontWeight: FontWeight.normal,
              color: context.theme.colorScheme.onSecondary,
            ),
          ),
        ),
        const SizedBox(height: 10),
        const SocialButtons(),
      ],
    );
  }
}

class _Details extends StatelessWidget {
  const _Details();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: List.generate(DETAILS.length, (index) {
        final String _detail = DETAILS[index]["detail"];
        final IconData _icon = DETAILS[index]["icon"];

        return GestureDetector(
          onTap: () {
            if (DETAILS[index].containsKey("scheme")) {
              final Uri _url = Uri(
                scheme: DETAILS[index]["scheme"],
                path: _detail,
              );

              url_launcher.launchUrl(_url);
            }
          },
          child: Padding(
            padding: EdgeInsets.all(Responsive.isMobile(context) ? 10 : 5),
            child: Row(
              children: [
                Icon(_icon, color: context.theme.colorScheme.onPrimary),
                const SizedBox(width: 10),
                Text(
                  _detail,
                  style: context.textTheme.titleSmall!
                      .copyWith(color: context.theme.colorScheme.onSecondary),
                ),
              ],
            ),
          ),
        );
      }),
    );
  }
}

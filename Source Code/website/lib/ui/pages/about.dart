import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '/config/data.dart';
import '/services/responsive.dart';

class AboutPage extends StatelessWidget {
  const AboutPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 500,
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topRight,
          end: Alignment.bottomLeft,
          colors: [
            context.theme.colorScheme.secondary,
            context.theme.colorScheme.tertiary,
            context.theme.colorScheme.secondary,
          ],
        ),
      ),
      child: Responsive(
        desktop: Padding(
          padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 75),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              AutoSizeText(
                "About Me",
                style: context.textTheme.displayLarge!.copyWith(
                  fontWeight: FontWeight.bold,
                  color: context.theme.colorScheme.onSecondary,
                ),
              ),
              const SizedBox(height: 50),
              AutoSizeText(
                ABOUT_ME,
                maxLines: 12,
                style: context.textTheme.displaySmall!.copyWith(
                  fontWeight: FontWeight.normal,
                  color: context.theme.colorScheme.onSecondary,
                ),
              ),
            ],
          ),
        ),
        mobile: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 25),
                child: AutoSizeText(
                  "About Me",
                  style: context.textTheme.displayMedium!.copyWith(
                    fontWeight: FontWeight.bold,
                    color: context.theme.colorScheme.onSecondary,
                  ),
                ),
              ),
              AutoSizeText(
                ABOUT_ME,
                maxLines: 18,
                style: context.textTheme.titleLarge!.copyWith(
                  fontWeight: FontWeight.normal,
                  color: context.theme.colorScheme.onSecondary,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

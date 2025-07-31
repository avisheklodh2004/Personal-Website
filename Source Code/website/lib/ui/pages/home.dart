import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:scrollable_positioned_list/scrollable_positioned_list.dart';
import 'package:url_launcher/url_launcher.dart' as url_launcher;

import '/config/data.dart';
import '/services/responsive.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return const SizedBox(
      height: 600,
      child: Center(
        child: Responsive(
          desktop: Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              _Details(),
              _Image(),
            ],
          ),
          mobile: _Details(),
        ),
      ),
    );
  }
}

class _Image extends StatelessWidget {
  const _Image();

  @override
  Widget build(BuildContext context) {
    return Flexible(
      child: Image.asset(
        "assets/images/Photo.png",
        errorBuilder: (context, _, __) => Container(
          height: 250,
          width: 250,
          decoration: const BoxDecoration(
            color: Colors.grey,
            borderRadius: BorderRadius.all(Radius.circular(500)),
          ),
          child: const Icon(Icons.question_mark, size: 50),
        ),
      ),
    );
  }
}

class _Details extends StatelessWidget {
  const _Details();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(left: 20),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text.rich(
            TextSpan(
              text: "Hey,",
              style: context.textTheme.displayLarge,
              children: [
                TextSpan(
                  text:
                      "\nI'm Avishek Lodh",
                  style: context.textTheme.displayMedium,
                ),
                TextSpan(
                  text: "\n\nFind my details and work below!",
                  style: context.textTheme.displayMedium,
                ),
              ],
            ),
          ),
          const SizedBox(height: 10),
          Row(
            children: [
              TextButton(
                onPressed: () async {
                  final Uri _url = Uri.parse(RESUME);

                  if (await url_launcher.canLaunchUrl(_url)) {
                    await url_launcher.launchUrl(_url);
                  }
                },
                child: const Row(
                  children: [
                    Icon(Icons.contact_page, size: 22),
                    SizedBox(width: 5),
                    Text("Resume"),
                  ],
                ),
              ),
              const SizedBox(width: 10),
              FilledButton(
                onPressed: () {
                  Get.find<ItemScrollController>().scrollTo(
                    index: 5,
                    duration: const Duration(milliseconds: 500),
                  );
                },
                child: const Row(
                  children: [
                    Icon(Icons.support_agent, size: 22),
                    SizedBox(width: 5),
                    Text("Get in Touch"),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

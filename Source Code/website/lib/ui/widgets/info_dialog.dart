import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:url_launcher/url_launcher.dart' as url_launcher;

import '/services/responsive.dart';

class InfoDialog extends StatelessWidget {
  final Map<String, dynamic> data;

  const InfoDialog({super.key, required this.data});

  @override
  Widget build(BuildContext context) {
    return Dialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10),
      ),
      surfaceTintColor: context.theme.primaryColor,
      child: Container(
        height: Responsive.isMobile(context) ? 700 : 525,
        width: 750,
        padding: const EdgeInsets.all(10),
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Flexible(
                  child: AutoSizeText(
                    data["title"],
                    maxLines: 2,
                    style: context.textTheme.displaySmall,
                  ),
                ),
                IconButton(
                  onPressed: () => Navigator.pop(context),
                  icon: const Icon(Icons.close),
                ),
              ],
            ),
            const Divider(),
            const SizedBox(height: 10),
            Expanded(
              child: Responsive(
                mobile: Column(
                  children: [
                    _Image(data["image"]),
                    const SizedBox(height: 20),
                    _Description(data["description"]),
                    _Links(data["links"]),
                  ],
                ),
                desktop: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Flexible(
                      flex: 3,
                      child: Column(
                        children: [
                          _Description(data["description"]),
                          _Links(data["links"]),
                        ],
                      ),
                    ),
                    const SizedBox(width: 15),
                    _Image(data["image"]),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _Links extends StatelessWidget {
  final List<dynamic> links;

  const _Links(this.links);

  @override
  Widget build(BuildContext context) {
    final ScrollController _scrollController = ScrollController();

    return Flexible(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Divider(height: 20),
          Text(
            "Links",
            style: context.textTheme.titleLarge,
          ),
          const SizedBox(height: 15),
          if (links.isNotEmpty)
            SizedBox(
              height: 50,
              width: 750,
              child: Scrollbar(
                thickness: 4,
                thumbVisibility: true,
                controller: _scrollController,
                child: ListView.separated(
                  controller: _scrollController,
                  scrollDirection: Axis.horizontal,
                  padding: const EdgeInsets.only(bottom: 12),
                  itemCount: links.length,
                  itemBuilder: (_, index) {
                    final String _name = links[index]["name"];
                    final String _link = links[index]["link"];
                    final IconData _icon = links[index]["icon"];

                    return GestureDetector(
                      onTap: () async {
                        final Uri _url = Uri.parse(_link);

                        if (await url_launcher.canLaunchUrl(_url)) {
                          await url_launcher.launchUrl(_url);
                        }
                      },
                      child: Container(
                        width: 150,
                        decoration: BoxDecoration(
                          border: Border.all(),
                          color: Colors.grey.shade300,
                          borderRadius:
                              const BorderRadius.all(Radius.circular(10)),
                        ),
                        padding: const EdgeInsets.symmetric(horizontal: 5),
                        child: Row(
                          children: [
                            Icon(
                              _icon,
                              size: 25,
                              color: context.theme.colorScheme.onPrimary,
                            ),
                            const SizedBox(width: 10),
                            Flexible(
                              child: AutoSizeText(
                                _name,
                                maxLines: 2,
                                overflow: TextOverflow.ellipsis,
                                style: context.textTheme.bodyLarge!.copyWith(
                                  color: const Color(0xFF0000EE),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                  separatorBuilder: (_, __) {
                    return const VerticalDivider(
                      width: 50,
                      thickness: 3,
                    );
                  },
                ),
              ),
            ),
          if (links.isEmpty)
            Center(
              child: Text(
                "No Links Available",
                style: context.textTheme.bodyLarge!
                    .copyWith(color: context.theme.colorScheme.onPrimary),
              ),
            ),
        ],
      ),
    );
  }
}

class _Description extends StatelessWidget {
  final String description;

  const _Description(this.description);

  @override
  Widget build(BuildContext context) {
    final ScrollController _scrollController = ScrollController();

    return Expanded(
      flex: Responsive.isMobile(context) ? 2 : 3,
      child: Scrollbar(
        thickness: 5,
        thumbVisibility: true,
        controller: _scrollController,
        child: SingleChildScrollView(
          controller: _scrollController,
          child: Text(
            description,
            style: context.textTheme.titleMedium,
          ),
        ),
      ),
    );
  }
}

class _Image extends StatelessWidget {
  final String image;

  const _Image(this.image);

  @override
  Widget build(BuildContext context) {
    return Flexible(
      flex: Responsive.isMobile(context) ? 2 : 3,
      child: Center(
        child: Container(
          decoration: BoxDecoration(
            color: Colors.grey,
            border: Border.all(width: 2),
            borderRadius: const BorderRadius.all(Radius.circular(10)),
          ),
          padding: const EdgeInsets.all(1),
          child: ClipRRect(
            borderRadius: const BorderRadius.all(Radius.circular(8)),
            child: Image.asset(
              image,
              height: 425,
              width: 350,
              fit: Responsive.isMobile(context) ? BoxFit.cover : BoxFit.fill,
              errorBuilder: (context, _, __) => Container(
                height: 425,
                width: 350,
                decoration: BoxDecoration(
                  color: Colors.grey,
                  border: Border.all(width: 2),
                  borderRadius: const BorderRadius.all(Radius.circular(10)),
                ),
                child: const Icon(Icons.question_mark),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

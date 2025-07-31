import 'dart:math';

import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import './info_dialog.dart';

class InfoCard extends StatelessWidget {
  final Map<String, dynamic> data;

  const InfoCard({super.key, required this.data});

  @override
  Widget build(BuildContext context) {
    final bool _alignment = Random().nextInt(10) % 2 == 0;
    final double _stop = Random().nextDouble() * (1 - 0.7) + 0.7;

    return GestureDetector(
      onTap: () {
        showDialog(
          context: context,
          builder: (_) => InfoDialog(data: data),
        );
      },
      child: Container(
        width: 250,
        margin: const EdgeInsets.only(bottom: 25, right: 10),
        padding: const EdgeInsets.all(10),
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [
              context.theme.colorScheme.secondary,
              context.theme.colorScheme.tertiary,
            ],
            stops: [0.1, _stop],
            begin: _alignment ? Alignment.bottomLeft : Alignment.topLeft,
            end: _alignment ? Alignment.topRight : Alignment.bottomRight,
          ),
          borderRadius: const BorderRadius.all(Radius.circular(10)),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Flexible(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  ClipRRect(
                    borderRadius: const BorderRadius.all(Radius.circular(10)),
                    child: Image.asset(
                      data["image"],
                      height: 250,
                      width: 250,
                      fit: BoxFit.fill,
                      errorBuilder: (context, _, __) => Container(
                        height: 250,
                        width: 250,
                        decoration: const BoxDecoration(
                          color: Colors.grey,
                          borderRadius: BorderRadius.all(Radius.circular(10)),
                        ),
                        child: const Icon(Icons.question_mark),
                      ),
                    ),
                  ),
                  const SizedBox(height: 10),
                  AutoSizeText(
                    data["title"],
                    maxLines: 2,
                    style: context.textTheme.titleLarge!
                        .copyWith(color: context.theme.colorScheme.onSecondary),
                  ),
                  Flexible(
                    child: Text(
                      data["description"],
                      overflow: TextOverflow.clip,
                      style: context.textTheme.titleSmall!.copyWith(
                        color: context.theme.colorScheme.onSecondary,
                        fontWeight: FontWeight.normal,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const Divider(),
            Center(
              child: Text(
                "Click to Learn More",
                style: context.textTheme.titleMedium!
                    .copyWith(color: context.theme.colorScheme.onSecondary),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

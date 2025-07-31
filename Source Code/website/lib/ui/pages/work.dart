import 'package:flutter/material.dart';
import 'package:get/get.dart';

class WorkPage extends StatelessWidget {
  const WorkPage({super.key});

  @override
  Widget build(BuildContext context) {
    final ScrollController _scrollController = ScrollController();

    return Container(
      height: 500,
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            context.theme.colorScheme.tertiary,
            context.theme.colorScheme.secondary,
            context.theme.colorScheme.tertiary,
          ],
        ),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 25),
              child: Text(
                "Work",
                style: context.textTheme.displayMedium!.copyWith(
                  fontWeight: FontWeight.bold,
                  color: context.theme.colorScheme.onSecondary,
                ),
              ),
            ),
            // Flexible(
            //   child: Scrollbar(
            //     controller: _scrollController,
            //     child: ListView(
            //       controller: _scrollController,
            //       scrollDirection: Axis.horizontal,
            //       children: List.generate(
            //         WORK.length,
            //         (index) => InfoCard(data: WORK[index]),
            //       ),
            //     ),
            //   ),
            // ),
          ],
        ),
      ),
    );
  }
}

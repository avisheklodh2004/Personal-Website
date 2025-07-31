import 'package:flutter/material.dart';
import 'package:get/get.dart';

class AwardsPage extends StatelessWidget {
  const AwardsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final ScrollController _scrollController = ScrollController();

    return SizedBox(
      height: 500,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 25),
              child: Text(
                "Awards",
                style: context.textTheme.displayMedium!
                    .copyWith(fontWeight: FontWeight.bold),
              ),
            ),
            // Flexible(
            //   child: Scrollbar(
            //     controller: _scrollController,
            //     child: ListView(
            //       controller: _scrollController,
            //       scrollDirection: Axis.horizontal,
            //       children: List.generate(
            //         AWARDS.length,
            //         (index) => InfoCard(data: AWARDS[index]),
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

import 'package:flutter/material.dart';
import 'package:get/get.dart';

class ProjectsPage extends StatelessWidget {
  const ProjectsPage({super.key});

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
                "Projects",
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
            //         PROJECTS.length,
            //         (index) => InfoCard(data: PROJECTS[index]),
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

import 'package:flutter/material.dart' hide PageController;

import '/config/theme.dart';
import '/ui/pages/export.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  runApp(const PersonalWebsite());
}

class PersonalWebsite extends StatelessWidget {
  const PersonalWebsite({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "Avishek Lodh",
      theme: WebsiteTheme.of(context),
      home: const BasePage(),
    );
  }
}

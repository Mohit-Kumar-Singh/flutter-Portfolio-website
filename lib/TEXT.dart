import 'package:flutter/material.dart';

class CustomText extends StatelessWidget {
  final text;
  //var fsize = 16;

  CustomText(
    this.text,
  );

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Text(
          '$text',
          style: TextStyle(
            color: Colors.white,
          ),
        ),
      ],
    );
  }
}

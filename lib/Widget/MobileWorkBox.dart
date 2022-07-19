import 'package:flutter/material.dart';
import 'package:potrtfolio/Widget/work_custom_data.dart';

class MobileWork extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WorkCustomData(
          title: "B.tech (Computer Science)",
          subTitle: "Ajay Kumar Garg Engeneering College, Ghaziabad",
          marks: "72.6%",
          duration: "2019 - Present",
        ),
        WorkCustomData(
          title: "Intermediate",
          subTitle: "Blooming Dale School, Badaun",
          marks: "93.2%",
          duration: "March - 2017 to MArch - 2018",
        ),
        WorkCustomData(
          title: "High School",
          subTitle: "Blooming Dale School, Badaun",
          marks: '9.8 (CGPA)',
          duration: "March - 2015 to March - 2016",
        ),
        WorkCustomData(
          title: "Sandip Institute Of Engineering & Management Nashik",
          subTitle:
              "I am currently pursuing Bachelor's Degree in Computer Science and Engineering \nat Savitribai Phule Pune University",
          duration: "2016 - Present",
          marks: '',
        ),
      ],
    );
  }
}

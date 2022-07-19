import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:potrtfolio/Widget/CustomText.dart';
import 'package:potrtfolio/Widget/Workbox.dart';

class Education extends StatefulWidget {
  @override
  _EducationState createState() => _EducationState();
}

class _EducationState extends State<Education> {
  @override
  Widget build(BuildContext context) {
    final Size size = MediaQuery.of(context).size;
    return ConstrainedBox(
      constraints: BoxConstraints.tightFor(
        width: size.width,
        height: size.height * 1.2,
      ),
      child: Column(
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              CustomText(
                text: "02.",
                textsize: 20.0,
                color: Color(0xff61F9D5),
                fontWeight: FontWeight.w700,
              ),
              SizedBox(
                width: 12.0,
              ),
              CustomText(
                text: "Education",
                textsize: 26.0,
                color: Color(0xffCCD6F6),
                fontWeight: FontWeight.w700,
              ),
              SizedBox(
                width: size.width * 0.009,
              ),
              Container(
                width: size.width / 4,
                height: 1.9,
                color: Color(0xff303C55),
              ),
            ],
          ),
          SizedBox(
            height: size.height * 0.065,
          ),
          Row(
            children: [
              Expanded(
                flex: 1,
                child: Container(
                    height: size.height * 1,
                    //color: Colors.indigo,
                    child: Stack(
                      children: [
                        Center(
                          child: VerticalDivider(
                            color: Color(0xff64FFDA),
                            thickness: 1.75,
                            width: 100,
                            indent: 10,
                            endIndent: 10,
                          ),
                        ),
                        Container(
                          child: Center(
                              child: Column(
                            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                            children: [
                              CircleAvatar(
                                  backgroundColor: Colors.pink,
                                  child: Image.asset('assets/images/AKG.jpg')),
                              CircleAvatar(
                                backgroundColor: Colors.red,
                                child: FaIcon(FontAwesomeIcons.freeCodeCamp,
                                    color: Colors.white),
                              ),
                              CircleAvatar(
                                backgroundColor: Colors.brown,
                                child: FaIcon(FontAwesomeIcons.laptopCode,
                                    color: Colors.white),
                              ),
                              // CircleAvatar(
                              //   backgroundColor: Colors.deepOrange,
                              //   child: FaIcon(FontAwesomeIcons.coffee,
                              //       color: Colors.white),
                              // ),
                              // CircleAvatar(
                              //   backgroundColor: Colors.deepPurple,
                              //   child: FaIcon(FontAwesomeIcons.dev,
                              //       color: Colors.white),
                              // ),
                            ],
                          )),
                        )
                      ],
                    )),
              ),
              Expanded(
                  flex: 4,
                  child: Container(
                    height: size.height * .9,
                    child: Institues(),
                  ))
            ],
          )
        ],
      ),
    );
  }
}

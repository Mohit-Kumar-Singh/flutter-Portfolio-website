import 'package:flutter/material.dart';
import 'package:resume/bottom.dart';
//import 'package:resume/TEXT.dart';
//import 'dart:io';

import 'side_details.dart';
import 'bottom.dart';

void main() {
  return runApp(MaterialApp(
    home: Resume(),
    debugShowCheckedModeBanner: false,
  ));
}

class Resume extends StatelessWidget {
  // final String aboutme = 'Responsible and ambitious student (8.5/10 SGPA) with the good excellent time management. Poseese proper Communication
  //  skills and strong work ethics thet will aid the our team in achiving its goals' ;
  Widget right() {
    return Column(
      children: [
        Container(
          // constraints: BoxConstraints.expand(),
          // margin: EdgeInsets.fromLTRB(0, 4, 2, 0),
          // padding: EdgeInsets.fromLTRB(left, top, right, bottom),
          height: 110,
          color: Colors.black,
          child: Expanded(
            child: Column(
              // crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  'Mohit Kumar Singh',
                  style: TextStyle(
                      color: Colors.white,
                      fontSize: 20,
                      fontFamily: 'PlayFair'),
                ),
                Divider(
                  indent: 40,
                  endIndent: 40,
                  color: Colors.white,
                  thickness: 2,
                ),
                Text(
                  'Conatus Trainee',
                  style: TextStyle(
                      color: Colors.white, fontFamily: 'Marck', fontSize: 18),
                ),
              ],
            ),
          ),
        ),
        Expanded(
          child: Container(
            color: Colors.black,
            child: Container(
                padding: EdgeInsets.fromLTRB(4, 20, 0, 4),
                width: double.infinity,
                //constraints: BoxConstraints.expand(),
                decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.all(Radius.circular(34))),
                child: Column(
                  children: [
                    Row(
                      children: [
                        SizedBox(
                          width: 15,
                        ),
                        Text(
                          'ABOUT ME ',
                          style: TextStyle(
                            fontFamily: 'PlayFair',
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                    Divider(
                      color: Colors.black,
                      indent: 15,
                    ),
                    Container(
                        padding: EdgeInsets.all(4),
                        child: RichText(
                          text: TextSpan(
                              text: 'R ',
                              style: TextStyle(
                                fontFamily: 'PlayFair',
                                color: Colors.black,
                                fontSize: 25,
                              ),
                              children: [
                                TextSpan(
                                    text:
                                        'esponsible and ambitious student with the excellent time management. Aiming to use my knowledge and resources to combine technology to creativity / art . Poseese proper Communication skills and strong work ethics that will aid our team in meeting its future  milestones.',
                                    style: TextStyle(
                                        fontSize: 17,
                                        color: Colors.black,
                                        fontFamily: 'Marck'))
                              ]),
                        )),
                    SizedBox(
                      height: 30,
                    ),
                    Row(
                      children: [
                        SizedBox(
                          width: 15,
                        ),
                        Text(
                          ' EDUCATION',
                          style: TextStyle(
                            fontFamily: 'PlayFair',
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                    Divider(
                      color: Colors.black,
                      indent: 15,
                    ),
                    Container(
                      padding: EdgeInsets.all(1),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: [
                          Text(
                            'B.Tech, Computer Science',
                            style: TextStyle(
                              fontFamily: 'PlayFair',
                              fontWeight: FontWeight.bold,
                              fontSize: 14,
                            ),
                          ),
                          Text(
                            '2nd Year/AKGEC',
                            style: TextStyle(fontFamily: "Marck"),
                          ),
                          SizedBox(
                            height: 10,
                          ),
                          Text(
                            '12th ,  93.2% PCM',
                            style: TextStyle(
                              fontFamily: 'PlayFair',
                              fontWeight: FontWeight.bold,
                              fontSize: 14,
                            ),
                          ),
                          Text(
                            'Blooming Dale School, Badaun U.P',
                            style: TextStyle(
                              fontFamily: 'Marck',
                            ),
                          ),
                          Text(
                            '2017-18  ',
                            style: TextStyle(
                              fontFamily: 'IndieFlower',
                            ),
                          ),
                        ],
                      ),
                    )
                  ],
                )),
          ),
        ),
      ],
    );
  }

  Widget left() {
    return Container(
      padding: EdgeInsets.fromLTRB(4, 8, 4, 4),
      width: 140,
      color: Colors.black,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        children: <Widget>[
          Container(
            padding: EdgeInsets.all(2),
            decoration: BoxDecoration(
              border: Border.all(
                color: Colors.white,
                width: 2,
              ),
              shape: BoxShape.circle,
            ),
            child: CircleAvatar(
              radius: 50,
              backgroundImage: AssetImage('images/My pic.jpg'),
            ),
          ),
          SizedBox(
            height: 20,
          ),
          Side()
        ],
      ),
    );
  }

  Widget centre() {
    return Row(
      children: <Widget>[
        left(),
        Expanded(child: right()),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Container(
          child: centre(),
        ),
        bottomNavigationBar: Bottom(),
      ),
    );
  }
}

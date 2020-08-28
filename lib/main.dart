import 'package:flutter/material.dart';
//import 'package:resume/TEXT.dart';
//import 'dart:io';

import 'side_details.dart';

void main() {
  return runApp(MaterialApp(
    home: Resume(),
    debugShowCheckedModeBanner: false,
  ));
}

class Resume extends StatelessWidget {
  Widget right() {
    return Container(
      //constraints: BoxConstraints,
      child: Column(
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
                        fontSize: 25,
                        fontFamily: 'Lobster'),
                  ),
                  Divider(
                    indent: 50,
                    endIndent: 50,
                    color: Colors.white,
                    thickness: 2,
                  ),
                  Text(
                    'Student',
                    style: TextStyle(
                      color: Colors.white,
                      // fontFamily: 'IndieFlower'
                    ),
                  ),
                ],
              ),
            ),
          ),
          Text('nlnvnf'),
        ],
      ),
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
          CircleAvatar(
            radius: 50,
            backgroundImage: AssetImage('images/pic.jpg'),
          ),
          SizedBox(
            height: 20,
          ),
          Side()
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
          body: Container(
        constraints: BoxConstraints.expand(),
        color: Colors.white10,
        padding: EdgeInsets.all(3),
        child: Row(
          // crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[left(), Expanded(child: right())],
        ),
      )),
    );
  }
}

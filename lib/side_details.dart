import 'package:flutter/material.dart';
import 'TEXT.dart';

final Widget star = Icon(
  Icons.star,
  color: Colors.white,
  size: 15,
);

class Side extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: [
          Text(
            'C O N T A C T',
            //textAlign: TextAlign.end,
            style: TextStyle(
              color: Colors.white,
              // fontFamily: 'Tangerine',
              fontSize: 18,
            ),
          ),
          Divider(
            indent: 8,
            endIndent: 8,
            color: Colors.white,
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            // mainAxisAlignment: MainAxisAlignment.start,
            children: [
              Row(
                children: [
                  Icon(
                    Icons.home,
                    color: Colors.white,
                  ),
                  SizedBox(
                    width: 6,
                  ),
                  Text(
                    'Badaun',
                    style: TextStyle(
                      color: Colors.white,
                    ),
                  )
                ],
              ),
              Row(
                children: [
                  Icon(
                    Icons.phone,
                    color: Colors.white,
                  ),
                  SizedBox(
                    width: 6,
                  ),
                  Text(
                    '9456862242',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 16,
                    ),
                  ),
                ],
              ),
              SizedBox(
                height: 2,
              ),
              Row(
                children: [
                  Icon(
                    Icons.email,
                    color: Colors.white,
                  ),
                  SizedBox(
                    width: 6,
                  ),
                  Text(
                    'mks61201625',
                    style: TextStyle(color: Colors.white),
                  )
                ],
              )
            ],
          ),
          SizedBox(
            height: 20,
          ),
          Text(
            'S K I L L S',
            style: TextStyle(fontSize: 18, color: Colors.white),
          ),
          // Divider(
          //   color: Colors.red,
          // ),
          Divider(
            indent: 10,
            endIndent: 10,
            color: Colors.white,
          ),
          Column(
            //crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              Row(
                children: [
                  Text(
                    'C++',
                    style: TextStyle(color: Colors.white),
                  ),
                  SizedBox(
                    width: 8,
                  ),
                  star,
                  star,
                  star,
                ],
              ),
              Row(
                children: <Widget>[
                  CustomText('AD'),
                  SizedBox(
                    width: 16,
                  ),
                  star,
                  star,
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }
}

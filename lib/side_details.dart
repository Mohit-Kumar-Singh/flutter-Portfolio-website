import 'package:flutter/material.dart';

final Widget star = Icon(
  Icons.chevron_right,
  color: Colors.white,
  size: 13,
);

class Side extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        // crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          SizedBox(
            height: 20,
          ),
          Text(
            'S K I L L S',
            style: TextStyle(
                fontSize: 17, fontFamily: 'PlayFair', color: Colors.white),
          ),
          Divider(
            indent: 10,
            endIndent: 10,
            color: Colors.white,
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              Row(
                children: [
                  star,
                  SizedBox(
                    width: 8,
                  ),
                  Text(
                    'C++',
                    style: TextStyle(color: Colors.white, fontFamily: "Marck"),
                  ),
                ],
              ),
              Row(
                children: [
                  star,
                  SizedBox(
                    width: 8,
                  ),
                  Text(
                    'Java',
                    style: TextStyle(color: Colors.white, fontFamily: "Marck"),
                  ),
                ],
              ),
              Row(
                children: [
                  star,
                  SizedBox(
                    width: 8,
                  ),
                  Text(
                    'Flutter',
                    style: TextStyle(color: Colors.white, fontFamily: "Marck"),
                  )
                ],
              ),
              Row(
                children: [
                  star,
                  SizedBox(
                    width: 8,
                  ),
                  Text(
                    'Management',
                    style: TextStyle(color: Colors.white, fontFamily: "Marck"),
                  )
                ],
              ),
              Row(
                children: [
                  star,
                  SizedBox(
                    width: 8,
                  ),
                  Text(
                    'Communication',
                    style: TextStyle(color: Colors.white, fontFamily: "Marck"),
                  ),
                ],
              ),
              SizedBox(
                height: 18,
              ),
              Center(
                child: Text(
                  'H O B B I E S ',
                  style: TextStyle(
                      color: Colors.white,
                      fontFamily: 'PlayFair',
                      fontSize: 17),
                ),
              ),
              Divider(
                color: Colors.white,
                indent: 10,
                endIndent: 10,
              ),
              Row(
                children: [
                  star,
                  SizedBox(
                    width: 8,
                  ),
                  Text(
                    'Art',
                    style: TextStyle(color: Colors.white, fontFamily: "Marck"),
                  ),
                ],
              ),
              Row(
                children: [
                  star,
                  SizedBox(
                    width: 8,
                  ),
                  Text(
                    'Craft ',
                    style: TextStyle(fontFamily: "Marck", color: Colors.white),
                  ),
                ],
              ),
              Row(
                children: [
                  star,
                  SizedBox(
                    width: 8,
                  ),
                  Text(
                    'Badminton ',
                    style: TextStyle(color: Colors.white, fontFamily: "Marck"),
                  ),
                ],
              ),
              Row(
                children: [
                  star,
                  SizedBox(
                    width: 8,
                  ),
                  Text(
                    'Series/Movies',
                    style: TextStyle(color: Colors.white, fontFamily: "Marck"),
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }
}

import 'package:flutter/material.dart';
import 'package:material_design_icons_flutter/material_design_icons_flutter.dart';

import 'package:url_launcher/url_launcher.dart';

class Bottom extends StatelessWidget {
  void _launchUrl(String url) async {
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      throw 'Could not launch $url';
    }
  }

  void _launchCall(int no) async {
    var url = 'tel:${no.toString()}';
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      throw 'Could not make call ';
    }
  }

  void _launchEmail(String email) async {
    var url = 'mailto:$email?subject= resume';
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      throw 'Could not make email ';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 105,
      decoration: BoxDecoration(
        color: Colors.black,
        //  borderRadius: BorderRadius.horizontal(left: Radius.circular(13))
      ),
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text(
              'G E T    I N    T O U C H ',
              style: TextStyle(
                fontFamily: 'PlayFair',
                color: Colors.white,
                fontSize: 18,
              ),
            ),
          ),
          Divider(
            thickness: 2,
            color: Colors.white,
            indent: 10,
            endIndent: 10,
          ),
          Row(
            children: [
              FlatButton(
                  onPressed: () => _launchUrl(
                      'https://instagram.com/mohit_kumar_singh?igshid=a7p8i0f07u98'),
                  child: Icon(
                    MdiIcons.instagram,
                    color: Colors.white,
                  )),
              FlatButton(
                onPressed: () => _launchCall(9219163086),
                child: Icon(
                  Icons.call,
                  color: Colors.white,
                ),
              ),
              FlatButton(
                  onPressed: () => _launchUrl(
                      'https://www.linkedin.com/in/mohit-kumar-singh-mks'),
                  child: Icon(
                    MdiIcons.linkedin,
                    color: Colors.white,
                  )),
              FlatButton(
                onPressed: () => _launchEmail('mks61201625@gmailcom'),
                child: Icon(
                  Icons.mail,
                  color: Colors.white,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

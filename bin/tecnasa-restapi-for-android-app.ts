#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { TecnasaRestapiForAndroidAppStack } from '../lib/tecnasa-restapi-for-android-app-stack';

const app = new cdk.App();
new TecnasaRestapiForAndroidAppStack(app, 'TecnasaRestapiForAndroidAppStack');

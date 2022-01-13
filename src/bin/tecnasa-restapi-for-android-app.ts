#!/usr/bin/env node
require('dotenv').config();

import * as cdk from '@aws-cdk/core';
import { TecnasaRestapiForAndroidAppStack } from '../lib/tecnasa-restapi-for-android-app-stack';

const app = new cdk.App();

const stackEnv = process.env.STACK_ENV ?? 'dev';

const prefix = `${ stackEnv }TecAWS`

new TecnasaRestapiForAndroidAppStack(app, `${prefix}TecnasaRestapiForAndroidAppStack`, {
    prefix
});

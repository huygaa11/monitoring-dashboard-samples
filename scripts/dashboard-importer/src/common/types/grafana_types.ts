/**
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Types for the Grafana Dashboard
// Typing based off of https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/view-dashboard-json-model/
// Fields that are not yet implemented are commented out

// Typing for Grafana Dashboards
export interface GrafanaDashboard {
  id: number;
  // Unique numeric identifier generated by Grafana
  gnetId?: number;

  // Unique dashboard identifier
  uid: number;
  title: string;
  description: string;
  tags: string[];
  style: 'dark' | 'light';
  timezone: 'utc' | 'browser';
  editable: boolean;

  templating: Templating; // Templating metadata

  schemaVersion: number; // Grafana JSON schema version (integer)
  version: number; // Version of dashboard itself

  // Dashboards will either contain a rows or panels
  panels?: Panel[]; // The default panel layout that most Dashboards use
  rows?: Row[]; // Legacy row layout similar to cloud-ops grid layout
}

// Typing for Grafana Panels, which are akin to cloud-ops tiles
export interface Panel {
  type: string;
  title: string;
  gridPos: GridPos;
  id: number;
  mode: string;
  content: string;
  targets?: Target[];
  panels: Panel[]; // panels array
  gauge?: Gauge;
  stack?: boolean;
  options?: PanelOptions;
  fieldConfig?: PanelFieldConfig;

  // Legacy row properties
  span?: number; //legacy width for rows, should always be present in row layout
  height?: string; // legacy height property, sometimes present
}

interface PanelOptions {
  content?: string;
  pieType?: 'pie' | 'donut';
}

interface PanelFieldConfig {
  defaults?: PanelFieldConfigDefaults;
}

interface PanelFieldConfigDefaults {
  custom?: PanelFieldConfigCustom;
}

interface PanelFieldConfigCustom {
  stacking?: PanelFieldConfigStacking;
}

interface PanelFieldConfigStacking {
  mode: 'none' | 'normal' | 'percent';
}

// Typing for the Row Layout, which is a legacy way of representing panels
export interface Row {
  title?: string;
  panels: Panel[];
  showTitle?: boolean;
  height: string;
}

// Typing for Panel target object, which holds info regarding the graph data
export interface Target {
  expr?: string;
  interval?: string;
  legendFormat?: string;
}

// Typing for Panel Grid Position
export interface GridPos {
  x: number;
  y: number;
  w: number;
  h: number;
}

// Typing for a Grafana's Template Variable text label to value mapping
export interface TemplateVariableTextValue {
  text?: string;
  value?: string;
}

// Typing for Grafana's Template Variable Dropdown Option
export interface TemplateVariableOption extends TemplateVariableTextValue {
  selected: boolean;
}

// Typing for Grafana's Individual Template Variable
export interface TemplateVariable {
  allFormat: string;
  current: TemplateVariableTextValue;
  datasource: string;
  includeAll: boolean;
  name: string;
  options: TemplateVariableOption[];
  query: string | QueryObject;
  refresh: boolean;
  type: string;
}

// Typing for Grafana's Template Variable List
export interface Templating {
  enable?: boolean;
  list: TemplateVariable[];
}

// Typing for Grafana's query object
export interface QueryObject {
  query: string;
  refId: string;
}

// Typing for Grafana's gauge chart
export interface Gauge {
  show: boolean;
  minValue: number;
  maxValue: number;
}
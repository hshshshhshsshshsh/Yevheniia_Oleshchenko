import { Dropbox, DropboxResponse, Error, files } from "dropbox";
import fs from "fs";
import path from "path";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10 * 1000;

describe("DropBox", () => {
  let dropbox: Dropbox;
  beforeEach((done) => {
    dropbox = new Dropbox({
      accessToken: "",
    });
    done();
  });
});

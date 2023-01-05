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

  it("Upload", (done) => {
    fs.readFile(
      path.join(__dirname, "../src/file.txt"),
      "utf8",
      (err, contents) => {
        if (err) {
          console.log(err);
          done.fail("FILE NOT FOUND");
        } else {
          dropbox
            .filesUpload({ path: "/file.txt", contents })
            .then((response: DropboxResponse<files.FileMetadata>) => {
              expect(response.status).toEqual(200);
              done();
            })
            .catch((err) => {
              console.log(err);
              done.fail("Upload FAILED");
            });
        }
      }
    );
  });

  it("GetFileMetadata", (done) => {
    dropbox
      .filesGetMetadata({ path: "/file.txt" })
      .then((response: any) => {
        expect(response.status).toEqual(200);
        done();
      })
      .catch((err: Error<files.GetMetadataError>) => {
        console.log(err);
        done.fail("GetFileMetadata FAILED");
      });
  });

  it("Delete", (done) => {
    dropbox
      .filesDeleteV2({ path: "/file.txt" })
      .then((response: DropboxResponse<files.DeleteResult>) => {
        expect(response.status).toEqual(200);
        done();
      })
      .catch((err) => {
        console.log(err);
        done.fail("Delete FAILED");
      });
  });
});

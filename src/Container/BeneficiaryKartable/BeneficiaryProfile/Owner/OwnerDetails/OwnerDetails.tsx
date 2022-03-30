import { DownloadOutlined } from "@ant-design/icons";
import { Card, Col, Descriptions, Row } from "antd";
import { useQuery } from "react-query";
import { getOwnerDocuments } from "../../../../../Requests/BeneficiaryKartable/BeneficiaryProfile/Owner/Owner";
import { siteURL } from "../../../../../Config/BaseUrl/BaseUrl";
import { genLookupId } from "../../../../../Utils/GenLookup/GenLookup";
type OwnerDetailTypes = {
  ownerProfileData: any;
};
const OwnerDetails = ({ ownerProfileData }: OwnerDetailTypes) => {
  const { data: ownerDocuments } = useQuery("getOwnerDocuments", () =>
    getOwnerDocuments(ownerProfileData?.Id)
  );

  let uploadPropertyDoc = [];
  if (ownerDocuments) {
    // eslint-disable-next-line array-callback-return
    uploadPropertyDoc = ownerDocuments
      .filter((i: any) => i.Type.Id === genLookupId.uploadPropertyDoc)
      .map((element: any) => {
        let fileName: any = element.File.Name;
        let url: any = siteURL + element.File.ServerRelativeUrl;

        if (fileName) {
          return (
            <Col>
              <a target="_blank" href={url} rel="noreferrer" key={element.File.Id}>
                <Card style={{ width: 180, height: 60 }} size={"small"} hoverable>
                  <Row justify={"space-between"} align="middle">
                    <DownloadOutlined
                      style={{
                        fontSize: "1.5em",
                      }}
                    />
                    <p>{element.Type.Title}</p>
                  </Row>
                </Card>
              </a>
            </Col>
          );
        }
      });
  }

  let uploadAttorneyDoc = [];
  if (ownerDocuments) {
    // eslint-disable-next-line array-callback-return
    uploadAttorneyDoc = ownerDocuments
      .filter((i: any) => i.Type.Id === genLookupId.uploadAttorneyDoc)
      .map((element: any) => {
        let fileName: any = element.File.Name;
        let url: any = siteURL + element.File.ServerRelativeUrl;

        if (fileName) {
          return (
            <Col>
              <a target="_blank" href={url} rel="noreferrer" key={element.File.Id}>
                <Card style={{ width: 180, height: 60 }} size={"small"} hoverable>
                  <Row justify={"space-between"} align="middle">
                    <DownloadOutlined
                      style={{
                        fontSize: "1.5em",
                      }}
                    />
                    <p>{element.Type.Title}</p>
                  </Row>
                </Card>
              </a>
            </Col>
          );
        }
      });
  }
  return (
    <>
      <Descriptions
        layout="horizontal"
        size="small"
        labelStyle={{ fontWeight: "bold" }}
      >
        <Descriptions.Item label={"درصد مالکیت"}>
          {ownerProfileData?.OwnerPercentage} درصد
        </Descriptions.Item>
        <Descriptions.Item label={"تصویر سند ملک (پشت و رو)"}>
          {uploadPropertyDoc.length !== 0 && (
            <>
              <Row justify={"start"}>{uploadPropertyDoc}</Row>
            </>
          )}
        </Descriptions.Item>
        <Descriptions.Item label={"تصویر وکالت نامه (در صورت وکالتی بودن ملک)"}>
          {uploadAttorneyDoc.length !== 0 ? (
            <>
              <Row justify={"start"}>{uploadAttorneyDoc}</Row>
            </>
          ) : (
            "سندی موجود نیست."
          )}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default OwnerDetails;

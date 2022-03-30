import { Descriptions, Col, Card, Row } from "antd";
import { useQuery } from "react-query";
import { siteURL } from "../../../../../Config/BaseUrl/BaseUrl";
import { getBeneficiaryDocuments } from "../../../../../Requests/BeneficiaryKartable/BeneficiaryProfile/Beneficiary/Beneficiary";
import { genLookupId } from "../../../../../Utils/GenLookup/GenLookup";
import { DownloadOutlined } from "@ant-design/icons";
type BeneficiaryDetailsTypes = {
  beneficiaryProfileData: any;
};
const BeneficiaryDetails = ({ beneficiaryProfileData }: BeneficiaryDetailsTypes) => {
  const { data: beneficiaryDocuments } = useQuery("getBeneficiaryDocuments", () =>
    getBeneficiaryDocuments(beneficiaryProfileData?.Id)
  );
  let unitLicense = [];
  if (beneficiaryDocuments) {
    // eslint-disable-next-line array-callback-return
    unitLicense = beneficiaryDocuments
      .filter((i: any) => i.Type.Id === genLookupId.unitLicense)
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
                  {/* <Row style={{ marginTop: "20px" }}></Row> */}
                </Card>
              </a>
            </Col>
          );
        }
      });
  }

  let unitLease = [];
  if (beneficiaryDocuments) {
    // eslint-disable-next-line array-callback-return
    unitLease = beneficiaryDocuments
      .filter((i: any) => i.Type.Id === genLookupId.unitLease)
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
        <Descriptions.Item label={"صنف"}>
          {beneficiaryProfileData?.UnitClass?.Title}
        </Descriptions.Item>
        <Descriptions.Item label={"تصویر جواز"}>
          {" "}
          {unitLicense.length !== 0 && (
            <>
              <Row justify={"start"}>{unitLicense}</Row>
            </>
          )}
        </Descriptions.Item>
        <Descriptions.Item label={"تصویر مباعینامه (اجاره نامه) در صورت وجود"}>
          {unitLease.length !== 0 ? (
            <>
              <Row justify={"start"}>{unitLease}</Row>
            </>
          ) : (
            "سندی موجود نیست."
          )}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default BeneficiaryDetails;

import { Button, Col, Flex, Modal, Row, Typography } from 'antd';

const { Title, Text } = Typography;

interface PostDeleteDialogProps {
  open: boolean;
  onCancel: () => void;
  onDelete: () => void;
}

export const PostDeleteDialog = ({
  open,
  onCancel,
  onDelete,
}: PostDeleteDialogProps) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      closeIcon={false}
      centered
      width={400}
      styles={{
        content: {
          padding: '24px 30px',
        },
      }}
    >
      <Flex vertical gap={32}>
        <Flex vertical align="center" justify="center" gap={8}>
          <Title level={4} style={{ color: '#1C1C1C', textAlign: 'center' }}>
            Please confirm if you wish to delete the post
          </Title>
          <Text style={{ color: '#5B5B5B', textAlign: 'center' }}>
            Are you sure you want to delete the post? Once deleted, it cannot be
            recovered.
          </Text>
        </Flex>
        <Row gutter={[12, 12]}>
          <Col
            xs={{
              span: 24,
              order: 2,
            }}
            lg={{
              span: 12,
              order: 1,
            }}
          >
            <Button
              variant="outlined"
              color="default"
              onClick={onCancel}
              block
              size="large"
            >
              Cancel
            </Button>
          </Col>
          <Col
            xs={{
              span: 24,
              order: 1,
            }}
            lg={{
              span: 12,
              order: 2,
            }}
          >
            <Button
              variant="solid"
              color="danger"
              onClick={onDelete}
              block
              size="large"
            >
              Delete
            </Button>
          </Col>
        </Row>
      </Flex>
    </Modal>
  );
};

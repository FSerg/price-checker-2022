import React from 'react';
import { Grid, Header, Statistic, Table } from 'semantic-ui-react';
import PriceOld from './PriceOld';

const PriceInfo = ({ doc }) => (
  <Grid divided padded >
    <Grid.Row>
      <Grid.Column width={16}>
        <Header as='h1'>{doc.title}
          <Header.Subheader>
            ШК: {doc.barcode}
          </Header.Subheader>
        </Header>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column width={10}>
        <Table striped compact unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Магазин / склад</Table.HeaderCell>
              <Table.HeaderCell>Наличие</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>

            {doc.stores.map(item => {
              return (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.title}</Table.Cell>
                  <Table.Cell>{item.balance}</Table.Cell>
                </Table.Row>
              );
            })}

          </Table.Body>
        </Table>
      </Grid.Column>

      <Grid.Column width={6}>
        <Statistic.Group size='huge'>
          <PriceOld price={doc.price} priceOld={doc.price_old} />
          <Statistic horizontal>
            <Statistic.Value>{doc.price}</Statistic.Value>
            <Statistic.Label>руб.</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default PriceInfo;

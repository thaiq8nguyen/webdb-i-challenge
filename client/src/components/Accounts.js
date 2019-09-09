import React, { useState, useEffect } from "react";
import { Button, Card, Header, Grid, Label } from "semantic-ui-react";
import axios from "axios";

function Accounts(props) {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/accounts")
      .then(accounts => {
        setAccounts(accounts.data.accounts);
      })
      .catch(errors => {
        console.log(errors);
      });
  }, []);
  return (
    <>
      <Grid padded={"vertically"} textAlign={"center"}>
        <Grid.Column width={12}>
          <Header>Accounts</Header>
          <Card.Group>
            {accounts.length > 0 &&
              accounts.map(account => (
                <Card key={account.id}>
                  <Card.Content>
                    <Card.Header as="h3">{account.name}</Card.Header>
                  </Card.Content>
                  <Card.Content>
                    <Grid columns={2}>
                      <Grid.Row verticalAlign={"middle"}>
                        <Grid.Column>
                          <Header as={"h4"} textAlign={"left"}>
                            Budget: $<span>{account.budget}</span>
                          </Header>
                        </Grid.Column>
                        <Grid.Column>
                          {account.is_active ? (
                            <Label color={"green"} content={"Active"} />
                          ) : (
                            <Label color={"red"} content={"Inactive"} />
                          )}
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Card.Content>
                </Card>
              ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </>
  );
}

export default Accounts;

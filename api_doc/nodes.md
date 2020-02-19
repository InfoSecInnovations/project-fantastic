This is the structure of the objects received by the client by performing a GET request to `/nodes`

    {
      node_id, // ID of the node in the database
      ips: ["127.0.0.1", ...],
      macs: [
        {mac: "4C:CC:6A:61:D1:07", vendor: "Realtek PCIe GBE Family Controller"},
        ...
      ],
      hostname,
      os,
      important, // 'important' means this host is on our network
      date, // date this data was gathered in Date.now() format
      connections: [
        {
          local_address,
          local_port,
          remote_address,
          remote_port,
          process: {id, name},
          state,
          to_node // node_id of the remote host
        }...
      ]
    }
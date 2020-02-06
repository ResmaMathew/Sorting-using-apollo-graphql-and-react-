import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableRow, TableBody, TableCell, TableHead, Typography, Divider } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import CreateIcon from '@material-ui/icons/Create';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'
import CancelIcon from '@material-ui/icons/Cancel';
import { IconButton } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import Fade from '@material-ui/core/Fade';
import TableSortLabel from '@material-ui/core/TableSortLabel';




const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.secondary,
    //maxWidth: '1000',
    //marginLeft: theme.spacing.unit * 2.5,
  },
  paper: {
    marginTop: theme.spacing(2),
    overflowX: 'auto',
    //maxWidth: '1000',
  },
  table: {
    width: '400',
  },
  paperheader: {
    //maxWidth: '800px',
    display: 'flex',
    justifyContent: 'space-between',
    height: '60px',
    marginTop: theme.spacing(2)

  },
  flexRow: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  image: {
    //width: theme.spacing(10),
    width: 60
  },
  bgimg: {
    height: 60, width: 60, backgroundColor: '#ffffff', backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center'
  },
  description: {
    maxHeight: theme.spacing(8),
    overflow: 'auto',
    width: '200px'
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1.5),
    color: '#858386',

  },
  typo: {
    margin: theme.spacing(1.5),
    color: 'black',

  },
  buttonAdv: {
    alignContent: 'center',
  },
  header: {
    marginTop: theme.spacing(4),

    color: '#fff',
    display: 'flex',
    justifyContents: 'space-between',
    height: '60px',
  },
  paginator: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },

}));


function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const ProductListView = ({ headers, products, paginatorProps, loading, order, onRequestSort }) => {
  const classes = useStyles()
  const { state: productsState, selectProduct, deSelectProduct } = useContext(ProductsContext)
  const [open, setOpen] = React.useState(false);
  const [editProduct, setEditProduct] = useState(null)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [placement, setPlacement] = React.useState();
  const [fullWidth] = useState(true);
  const [maxWidth] = useState('sm');
  const sortInput = headers && headers.name
  const [orderBy, setOrderBy] = useState(sortInput);
 



  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  const handleChange = (event, id) => {
    if (event.target.checked) {
      selectProduct({ id: id })
    } 
    else {
      deSelectProduct({ id: id })
    }
  }
  const handleClick = newPlacement => event => {
    setAnchorEl(event.currentTarget);
    setOpen(prev => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
 
   if (loading) {
    return (
	<div >
      <div className={classes.paginator} >
        <Paginator {...paginatorProps} />
      </div>
      <p>Loading...</p> 
	</div>)
  }

  return (<div className={classes.root}>
    <div className={classes.paginator} >
    <Paginator {...paginatorProps} />
    </div>
    <Paper className={classes.paper}>
      {products.map(product => {
        return (
        <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>
            </TableCell>
            {headers && headers.map(f => {
                return (<>
                <TableCell key={'f_' + f.name}
                  align={f.numeric ? 'right' : 'left'}
                  padding={f.disablePadding ? 'none' : 'default'}
                  sortDirection={orderBy === f.name ? order : false}
                >
                  {f.label}
                  {(f.filter !== null) &&
                    <TableSortLabel
                      active={orderBy === f.name}
                      direction={order}
                      onClick={createSortHandler(f.name)}
                    >
                    </TableSortLabel>
                  }
                </TableCell>
              </>)

            })}
            <TableCell>
            </TableCell>
            <TableCell>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(product => {
            return (<>
              <TableRow>
                <TableCell key={'p_' + product.id} >
                  <>
                    <Checkbox
                      color='primary'
                      multiple
                      name={product.name}
                      checked={
                        productsState.selected.includes(product.id)
                      }
                      onChange={(e) => handleChange(e, product.id)}
                      inputProps={{
                        'aria-label': 'primary checkbox',
                      }}
                    />
                  </>
                </TableCell>
                {headers && headers.map(header => {
                  const value = product.fields.find(p => p.name == header.name)
                    if (value.type === 'IMAGE') {
                    const image1 = JSON.parse(value.dataJSON)[0]
                    return (<>
                      <TableCell key={image1}>
                        <div className={classes.description}>
                          <div style={{ backgroundImage: `url('${(image1)}')` }} className={classes.bgimg} />
                        </div>
                      </TableCell>
                    </>)
                  }
                  return (<>
                    <TableCell>
                      <div className={classes.description}>
                        {value && JSON.parse(value.dataJSON)}
                      </div>
                    </TableCell>
                  </>)
                }
                )}
              </TableRow>
            </>)
          })}
        </TableBody>
      </Table>
    </Paper >
  </div>)
}
export default ProductListView

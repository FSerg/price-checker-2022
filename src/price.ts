// @ts-nocheck
import express from 'express';
import axios from 'axios';
import log from './logger';

const router = express.Router();

const PriceCheck = (barcode, res) => {
    axios
        //.get(`${config.lc_server}${barcode}`)
        .get(`${process.env.S1_API_URL}${barcode}`, {
            auth: {
                username: process.env.S1_USER,
                password: process.env.S1_PASS
            }
        })
        .then(response => {
            log.info('response data:');
            log.info(response.data);

            return res.status(200).send({ status: 'ok', result: response.data });
        })
        .catch(error => {
            let errMsg = "Ошибка при выполнении запроса в 1С";
            if (error.response) {
                log.error(error.response.data);
                log.error('Status: ', error.response.status);
                if (error.response.status == 400) {
                    errMsg = "Ошибка при выполнении запроса в 1С, обратитесь к Администратору!";
                }
                if (error.response.status == 401) {
                    errMsg = "Ошибка авторизации в 1С, обратитесь к Администратору!";
                }
                if (error.response.status == 404) {
                    errMsg = `Товар по штрих-коду: ${barcode} не найден в 1С`;
                }

            } else if (error.request) {
                log.error(error.request);
            } else {
                log.error(error.message);
            }

            return res.status(400).send({ status: 'error', result: errMsg });
        });
};

router.get('/price', (req, res) => {
    log.info('GET price');
    log.info('Query: ', req.query);

    if (req.query === undefined) {
        const errMsg = "В запросе отсутствуют параметры (barcode)";
        log.error(errMsg);
        return res.status(400).send({ status: 'error', result: errMsg });
    }

    if (!req.query.barcode) {
        const errMsg = 'В запросе пустой штрих-код (barcode)';
        log.error(errMsg);
        return res.status(400).send({ status: 'error', result: errMsg });
    }

    const { barcode } = req.query;
    PriceCheck(barcode, res);

});

export default router;

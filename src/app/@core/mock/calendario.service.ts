import { Injectable } from '@angular/core';
import { CalendarioData } from '../data/calendario';

@Injectable()
export class CalendarioMockService extends CalendarioData {

  public data = [
    {
      data: '2019-09-09', maximoEncaixes: 5, agendamentos: [
        { hora: '08:00', status: 'Livre', marcacao: null },
        { hora: '08:30', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreiraddd', cpf: '', celular: '21976364737' } },
        { hora: '09:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '09:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '09:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '09:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '09:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '09:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '09:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '09:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '09:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '09:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '09:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '09:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '09:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '09:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '09:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '09:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '09:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '09:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '09:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '09:30', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Encaixe', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
      ]
    },
    {
      data: '2019-09-10', maximoEncaixes: 5, agendamentos: [
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:30', status: 'Livre', marcacao: null },
        { hora: '11:00', status: 'Livre', marcacao: null },
        { hora: '11:30', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
      ]
    },
    {
      data: '2019-09-11', maximoEncaixes: 5, agendamentos: [
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:30', status: 'Livre', marcacao: null },
        { hora: '11:00', status: 'Livre', marcacao: null },
        { hora: '11:30', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
      ]
    },
    {
      data: '2019-09-12', maximoEncaixes: 5, agendamentos: [
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:30', status: 'Livre', marcacao: null },
        { hora: '11:00', status: 'Livre', marcacao: null },
        { hora: '11:30', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
        { hora: '11:00', status: 'Livre', marcacao: null },
        { hora: '11:30', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
        { hora: '11:00', status: 'Livre', marcacao: null },
        { hora: '11:30', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
        { hora: '11:00', status: 'Livre', marcacao: null },
        { hora: '11:30', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
      ]
    },
    {
      data: '2019-09-13', maximoEncaixes: 0, agendamentos: [
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:30', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '11:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '11:30', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '12:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
      ]
    },
    {
      data: '2019-09-14', maximoEncaixes: 5, agendamentos: [
        { hora: '08:00', status: 'Livre', marcacao: null },
        { hora: '08:30', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreiraddd', cpf: '', celular: '21976364737' } },
        { hora: '09:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '09:30', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
      ]
    },
    {
      data: '2019-09-15', maximoEncaixes: 5, agendamentos: [
        { hora: '08:00', status: 'Livre', marcacao: null },
        { hora: '08:30', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreiraddd', cpf: '', celular: '21976364737' } },
        { hora: '09:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '09:30', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
      ]
    },
    {
      data: '2019-09-16', maximoEncaixes: 5, agendamentos: [
        { hora: '08:00', status: 'Livre', marcacao: null },
        { hora: '08:30', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreiraddd', cpf: '', celular: '21976364737' } },
        { hora: '09:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '09:30', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
      ]
    },
    {
      data: '2019-09-17', maximoEncaixes: 5, agendamentos: [
        { hora: '08:00', status: 'Livre', marcacao: null },
        { hora: '08:30', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreiraddd', cpf: '', celular: '21976364737' } },
        { hora: '09:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '09:30', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
      ]
    },
    {
      data: '2019-09-18', maximoEncaixes: 5, agendamentos: [
        { hora: '08:00', status: 'Livre', marcacao: null },
        { hora: '08:30', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreiraddd', cpf: '', celular: '21976364737' } },
        { hora: '09:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '09:30', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
      ]
    },
    {
      data: '2019-09-19', maximoEncaixes: 5, agendamentos: [
        { hora: '08:00', status: 'Livre', marcacao: null },
        { hora: '08:30', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreiraddd', cpf: '', celular: '21976364737' } },
        { hora: '09:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '09:30', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
      ]
    },
    {
      data: '2019-09-20', maximoEncaixes: 5, agendamentos: [
        { hora: '08:00', status: 'Livre', marcacao: null },
        { hora: '08:30', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreiraddd', cpf: '', celular: '21976364737' } },
        { hora: '09:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '09:30', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
      ]
    },
    {
      data: '2019-09-21', maximoEncaixes: 5, agendamentos: [
        { hora: '08:00', status: 'Livre', marcacao: null },
        { hora: '08:30', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreiraddd', cpf: '', celular: '21976364737' } },
        { hora: '09:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '09:30', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
      ]
    },
    {
      data: '2019-09-22', maximoEncaixes: 5, agendamentos: [
        { hora: '08:00', status: 'Livre', marcacao: null },
        { hora: '08:30', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreiraddd', cpf: '', celular: '21976364737' } },
        { hora: '09:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '09:30', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
      ]
    },
    {
      data: '2019-09-23', maximoEncaixes: 5, agendamentos: [
        { hora: '08:00', status: 'Livre', marcacao: null },
        { hora: '08:30', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreiraddd', cpf: '', celular: '21976364737' } },
        { hora: '09:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '09:30', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
      ]
    },
    {
      data: '2019-09-24', maximoEncaixes: 5, agendamentos: [
        { hora: '08:00', status: 'Livre', marcacao: null },
        { hora: '08:30', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreiraddd', cpf: '', celular: '21976364737' } },
        { hora: '09:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '09:30', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
      ]
    },
    {
      data: '2019-09-25', maximoEncaixes: 5, agendamentos: [
        { hora: '08:00', status: 'Livre', marcacao: null },
        { hora: '08:30', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreiraddd', cpf: '', celular: '21976364737' } },
        { hora: '09:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '09:30', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
      ]
    },
    {
      data: '2019-09-26', maximoEncaixes: 5, agendamentos: [
        { hora: '08:00', status: 'Livre', marcacao: null },
        { hora: '08:30', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreiraddd', cpf: '', celular: '21976364737' } },
        { hora: '09:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '09:30', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
      ]
    },
    {
      data: '2019-09-27', maximoEncaixes: 5, agendamentos: [
        { hora: '08:00', status: 'Livre', marcacao: null },
        { hora: '08:30', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreiraddd', cpf: '', celular: '21976364737' } },
        { hora: '09:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '09:30', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
      ]
    },
    {
      data: '2019-09-28', maximoEncaixes: 5, agendamentos: [
        { hora: '08:00', status: 'Livre', marcacao: null },
        { hora: '08:30', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreiraddd', cpf: '', celular: '21976364737' } },
        { hora: '09:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '09:30', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
      ]
    },
    {
      data: '2019-09-29', maximoEncaixes: 5, agendamentos: [
        { hora: '08:00', status: 'Livre', marcacao: null },
        { hora: '08:30', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreiraddd', cpf: '', celular: '21976364737' } },
        { hora: '09:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '09:30', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '', celular: '21976364737' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
      ]
    }
  ];

  getData(): any[] {
    return this.data;
  }

  async getDataWithLoading(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(this.data);
      }, 100);
    });
  }

  async getDate(data): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(this.data.find(e => e.data === data));
      }, 3000);
    });
  }
}

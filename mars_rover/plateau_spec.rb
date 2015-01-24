# encoding: utf-8

require 'rspec'
require_relative 'plateau'

describe Plateau do
  describe 'Plateau is singleton' do
    specify 'can not create a new object of this type' do
      expect { Plateau.new }.to raise_error
    end
  end

  describe 'receives initial coordinates' do
    let(:plateau) { Plateau.instance.tap { |o| o.x_ur = 5; o.y_ur = 5 } }

    specify 'has correct initial coordinates' do
      plateau.x_bl.should be 0
      plateau.y_bl.should be 0
      plateau.x_ur.should be 5
      plateau.y_ur.should be 5
    end
  end

end
